import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Globals, SocketCommands } from './../globals';
import { GameData } from './../util/gamedata';
import { Board } from './../board';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    providers: []
})

export class GameComponent implements OnInit {

    stage: GameStage = GameStage.lobbyWaiting;

    @Input() gameData: GameData;
    @Input() socket: any;

    @Output() gameEvent: EventEmitter<Object> = new EventEmitter<Object>();

    private playing: Boolean = false;

    constructor(private globals: Globals) {}

    ngOnInit(): void {
        this.syncBoardFromSever(this.gameData.board);
        this.listenForChanges();

        this.socket.emit(SocketCommands.board.update, this.gameData.token);
    }

    backToServers(): void {
        this.socket.emit(SocketCommands.board.remove, this.gameData.token);
        this.gameEvent.emit({ task: 'exit' });
    }

    listenForChanges(): void {
        const game = this;
        const token = this.gameData.token.toString();
        this.socket.on(SocketCommands.board.updated, function (data) {
            if (data.token === token) {
                game.syncBoardFromSever(data);
            }
        });
        this.socket.on(SocketCommands.user.disconnected, function (data) {
            if (data.token.toString() === token) {
                console.log('Player %s has left the game, reason: %s', data.name, data.reason);
                game.stage = GameStage.lobbyLeft;
            }
        });
    }

    syncBoardFromSever(serverBoard: Board): void {
        if (serverBoard) {
            if (!this.playing) {
                if (serverBoard.names.length === 2) {
                    this.playing = true;
                    this.stage = GameStage.game;
                }
            }
            const oldTurn = this.board.turn;
            this.board.update(serverBoard);
            if (oldTurn !== undefined && oldTurn !== this.board.turn) {
               //  this.clickSound.play();
            }
            if (this.board.winner) {
                this.board.currentX = this.board.currentY = undefined;
                if (this.board.winner === -1) {
                    console.log('Game was a draw');
                } else {
                    console.log('%s has won the game', this.board.names[this.board.winner]);
                }
            }
        }
    }

    place(e: any): void {
        const game = this;
        if (this.currentTurn && this.board.winner === undefined) {
            const id = e.target.id, row = id.substring(1, 2), col = id.substring(2, 3);
            if (this.validSector(row, col)) {
                this.socket.emit(SocketCommands.board.place, {
                    token: this.board.token,
                    placeX: col,
                    placeY: row
                }, function (board) {
                    game.syncBoardFromSever(board);
                });
            }
        }
    }

    validSector(row, col): Boolean {
        if (this.board.winner !== undefined) { return true; }
        if (this.board.currentY === undefined && this.board.currentX === undefined) { return true; }

        if (Math.floor(row / 3) === this.board.currentY % 3) {
            if (Math.floor(col / 3) === this.board.currentX % 3) { return true; }
        }

        let filled = true;
        const sectorX = Math.floor(this.board.currentX % 3) * 3;
        const sectorY = Math.floor(this.board.currentY % 3) * 3;
        for (let y = 0; y < this.globals.GRID_SIZE; y++) {
            for (let x = 0; x < this.globals.GRID_SIZE; x++) {
                if (!filled) { continue; }
                if (this.board.tiles[sectorY + y][sectorX + x].used === false) { filled = false; }
            }
        }
        if (filled) { return true; }
        return false;
    }

    get currentTurn(): boolean {
        return this.board.turn === this.gameData.playerId;
    }

    get currentTurnMessage(): String {
        if (this.board.winner !== undefined) {
            if (this.board.winner === -1) {
                return 'The game was a draw';
            }
            return this.board.names[this.board.winner] + ' has won!';
        }
        if (this.currentTurn) {
            return 'It is your turn!';
        }
        return 'It is ' + this.board.names[this.gameData.playerId === 1 ? 0 : 1] + '\'s turn!';
    }

    get currentHelpMessage(): String {
        if (this.board.winner !== undefined) {
            // TODO Turn this into a button
            return 'Refresh this page to play again';
        }
        return 'You are ' + ((this.gameData.playerId === 0) ? 'crosses' : 'noughts');
    }

    get cssCurrentPlayerColor(): String {
        if (this.board.turn === 0) {
            return 'border-cross';
        }
        return 'border-nought';
    }

    get board(): Board {
        return this.gameData.board;
    }

    get isInLobbyWaiting(): Boolean {
        return this.stage === GameStage.lobbyWaiting;
    }

    get isInLobbyLeft(): Boolean {
        return this.stage === GameStage.lobbyLeft;
    }

    get isInLobby(): Boolean {
        return this.isInLobbyWaiting || this.isInLobbyLeft;
    }

    get isInGame(): Boolean {
        return this.stage === GameStage.game;
    }

    get isInResults(): Boolean {
        return this.stage === GameStage.results;
    }
}

enum GameStage {
    lobbyWaiting,
    lobbyLeft,
    game,
    results,
    left
}
