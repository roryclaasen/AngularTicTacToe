import { Component } from '@angular/core';
import { Board } from './board';
import { Globals } from './globals';
import { GUID } from './guid';

import * as howler from 'howler';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: []
})

export class AppComponent {
    title = 'Tic-Tac-Toe';
    navbar = true;

    globals;
    clickSound: any;

    // Login Vars

    loaded = false;

    inputPrompt = 'Enter your username';
    inputLabel = 'Username';
    input = '';
    inputType = 'text';

    username = '';
    gamePin = '';

    socket: any = null;

    // Game Vars
    playerId = 0;

    gameUrl: string;
    board: Board;

    // Login
    constructor(globals: Globals) {
        this.globals = globals;
        globals.getSocket().then(data => this.socket = data);
        this.gameUrl = globals.gameUrl();
        this.board = new Board();

        this.clickSound = new howler.Howl({
            src: ['/assets/click.wav']
        });
    }

    validate(): void {
        const input = this.input;
        const length = input.length;
        if (length > 0) {
            if (this.username.length === 0) {
                this.username = input;
                this.input = '';
                this.inputPrompt = 'Enter the Game Pin or Create a server';
                this.inputLabel = 'Game Pin';
                this.inputType = 'number';
            } else {
                this.joinServer(input);
            }
        }
    }

    resetInputs(): void {
        this.username = this.input = '';
        this.inputType = 'text';
        this.inputPrompt = 'Enter your username';
        this.inputLabel = 'Username';
    }

    joinServer(gamePin): void {
        this.socket.emit(this.globals.socketCommands.game.join, {
            token: gamePin,
            name: this.username
        }, (data) => this.serverJoined(data));
    }

    createServer(): void {
        const id = new GUID();
        this.socket.emit(this.globals.socketCommands.board.new, {
            username: this.username,
            guid: id.toString()
        }, (data) => this.serverCreated(id.toString(), data));
    }

    serverJoined(data) {
        if (data.error) {
            console.log(data.error);
            alert(data.error);
        } else {
            console.log('Joined game %s', data.token);
            this.gamePin = data.token;
            this.join(data);
            this.sendUpdateNotification();
        }
    }

    serverCreated(id, data) {
        if (data.guid === id) {
            console.log('Created game %s', data.board.token);
            this.gamePin = data.board.token;
            this.join(data.board);
        }
    }

    join(serverBoard): void {
        if (serverBoard) {
            if (this.gamePin === serverBoard.token) {
                this.syncBoardFromSever(serverBoard);
                this.playerId = this.board.userId(this.username);
            }
        }

        this.loaded = true;
        this.listenForChanges();
    }

    // GAME

    sendUpdateNotification(): void {
        this.socket.emit(this.globals.socketCommands.board.update, this.gamePin);
    }

    syncBoardFromSever(serverBoard) {
        if (serverBoard) {
            const oldTurn = this.board.turn;
            this.board.update(serverBoard);
            if (oldTurn !== undefined && oldTurn !== this.board.turn) {
                this.clickSound.play();
            }
            if (this.board.winner) {
                this.board.currentX = this.board.currentY = undefined;
                console.log('%s has won the game', this.board.names[this.board.winner]);
            }
        }
    }

    listenForChanges() {
        const game = this;
        this.socket.on(this.globals.socketCommands.board.updated, function (data) {
            if (data.token === game.gamePin) {
                game.syncBoardFromSever(data);
            }
        });
        this.socket.on(this.globals.socketCommands.user.disconnected, function (data) {
            if (data.token.toString() === game.gamePin.toString()) {
                console.log('Player %s has left the game, reason: %s', data.name, data.reason);
                alert(data.name + ' has left the game');
                location.reload();
            }
        });
    }

    place(e: any): AppComponent {
        const game = this;
        if (this.currentTurn && this.board.winner === undefined) {
            const id = e.target.id, row = id.substring(1, 2), col = id.substring(2, 3);
            if (this.validSector(row, col)) {
                this.socket.emit(this.globals.socketCommands.board.place, {
                    token: this.board.token,
                    placeX: col,
                    placeY: row
                }, function(board) {
                    game.syncBoardFromSever(board);
                });
            }
        }
        return this;
    }

    validSector(row, col) {
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
        return this.board.turn === this.playerId;
    }

    get currentTurnMessage(): String {
        if (this.board.winner !== undefined) {
            return this.board.names[this.board.winner] + ' has won!';
        }
        if (this.currentTurn) {
            return 'It is your turn!';
        }
        return 'It is ' + this.board.names[this.playerId === 1 ? 0 : 1] + '\'s turn!';
    }

    get currentHelpMessage(): String {
        if (this.board.winner !== undefined) {
            return 'Refresh this page to play again';
        }
        return 'You are ' + ((this.playerId === 0) ? 'crosses' : 'noughts');
    }

    get cssCurrentPlayerColor(): String {
        if (this.board.turn === 0) {
            return 'border-cross';
        }
        return 'border-nought';
    }
}
