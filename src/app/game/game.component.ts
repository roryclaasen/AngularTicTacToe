import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Globals, GameData, GameStage, SocketCommands } from './../util/globals';
import { Board } from './../util/board';
import { Howler } from './../util/audio';

import * as FileSaver from 'file-saver';

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

    ngOnInit(): void {
        this.syncBoardFromSever(this.gameData.board);
        this.listenForChanges();

        this.socket.emit(SocketCommands.board.update, this.gameData.token);
    }

    backToServers(): void {
        console.log('Exiting Game');
        this.socket.emit(SocketCommands.board.remove, this.gameData.token);
        this.gameEvent.emit({ task: 'exit' });
    }

    downloadMoves(): void {
        let blob = new Blob([JSON.stringify({
            moves: this.board.moves,
            playerNames: this.board.names,
            winner: this.board.winner
        })], {
            type: 'application/json'
        });
        FileSaver.saveAs(blob, 'moves-' + this.gameData.token + '.json');
    }

    listenForChanges(): void {
        const game = this;
        const token = this.gameData.token;
        this.socket.on(SocketCommands.board.updated, function (data) {
            if (data.token === token) {
                game.syncBoardFromSever(data);
            }
        });
        this.socket.on(SocketCommands.user.disconnected, function (data) {
            if (data.token.toString() === token.toString()) {
                console.log('Player %s has left the game, reason: %s', data.name, data.reason);
                game.stage = GameStage.lobbyLeft;
                game.gameEvent.emit({ task: 'ended' });
            }
        });
    }

    syncBoardFromSever(serverBoard: Board): void {
        if (serverBoard) {
            if (!this.playing) {
                if (serverBoard.names.length === 2) {
                    this.playing = true;
                    this.stage = GameStage.game;
                    this.gameEvent.emit({ task: 'started' });
                }
            }
            const oldTurn = this.board.turn;
            this.board.update(serverBoard);
            if (oldTurn !== undefined && oldTurn !== this.board.turn) {
                Howler.playClick(this.board.sectorSize());
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
        if (this.currentTurn && this.board.winner === undefined) {
            const id = e.target.id, row = id.substring(1, 2), col = id.substring(2, 3);
            if (this.validSector(Math.floor(row / 3), Math.floor(col / 3))) {
                const game = this;
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

        if (row === Math.floor(this.board.currentY % 3)) {
            if (col === Math.floor(this.board.currentX % 3)) { return true; }
        }

        let filled = true;
        const sectorX = Math.floor(this.board.currentX % 3) * 3;
        const sectorY = Math.floor(this.board.currentY % 3) * 3;
        for (let y = 0; y < Globals.GRID_SIZE; y++) {
            for (let x = 0; x < Globals.GRID_SIZE; x++) {
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
        if (this.gameData.spectating) {
            return 'It is ' + this.board.names[this.board.turn] + '\'s turn!';
        }
        if (this.currentTurn) {
            return 'It is your turn!';
        }
        return 'It is ' + this.board.names[this.gameData.playerId === 1 ? 0 : 1] + '\'s turn!';
    }

    get currentHelpMessage(): String {
        if (this.gameData.spectating) {
            return 'You Are Spectating';
        }
        if (this.board.winner !== undefined) {
            // TODO Turn this into a button
            return 'Create a new game to play again';
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

    tableTheme(): String {
        if (this.gameData.theme.themeId === 0) {
            return '';
        }
        return this.gameData.theme.themes[this.gameData.theme.themeId].class;
    }

    showLetters(): Boolean {
        if (this.gameData.theme.themes[this.gameData.theme.themeId].letters) {
            return true;
        }
        return this.gameData.theme.showLetters;
    }

    getSectorClass(x: number, y: number): any[] {
        let classes = [];
        if (!this.validSector(y, x)) {
            classes.push('disabled');
        } else if (!this.currentTurn) {
            classes.push('notCurrentTurn');
        }
        return classes;
    }

    getTableClasses(results: Boolean): any[] {
        let classes = [];
        // Border Color
        if (this.tableTheme() !== 'chalk' && !results) {
            if (this.board.turn === 0) {
                classes.push('border-cross');
            } else {
                classes.push('border-nought');
            }
        }
        // Show Letters
        if (this.showLetters()) {
            classes.push('showLetters');
        }
        classes.push(this.tableTheme());
        return classes;
    }

    tilesInSector(x: number, y: number) {
        let tiles = [];
        for (let tY = 0; tY < 3; tY++) {
            tiles[tY] = [];
            for (let tX = 0; tX < 3; tX++) {
                tiles[tY][tX] = this.board.tiles[(y * 3) + tY][(x * 3) + tX];
            }
        }
        return tiles;
    }

    get tilesInGame() {
        let tiles = [];
        for (let y = 0; y < 3; y++) {
            tiles[y] = [];
            for (let x = 0; x < 3; x++) {
                tiles[y][x] = this.tilesInSector(x, y);
            }
        }
        return tiles;
    }
}

