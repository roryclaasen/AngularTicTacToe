import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BoardService } from './board.service';
import { Board } from './board';

import { Globals } from './globals';

import { GUID } from './guid';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [BoardService]
})

export class AppComponent {
    title = 'Tic-Tac-Toe';
    navbar = false;

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

    // Login

    constructor(private boardService: BoardService, private toastr: ToastsManager, private _vcr: ViewContainerRef, private globals: Globals) {
        globals.getSocket().then(data => this.socket = data);
        this.toastr.setRootViewContainerRef(_vcr);
        this.boardService.createBoard();
        this.gameUrl = globals.gameUrl();
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
            this.sendUpdateTilesNotification();
            this.join(data.board);
        }
    }

    join(serverBoard): void {
        if (serverBoard) {
            if (this.gamePin === serverBoard.token) {
                this.syncBoardFromSever(serverBoard, false);
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

    sendUpdateTilesNotification(): void {
        this.socket.emit(this.globals.socketCommands.board.updateTiles, {
            tiles: this.board.tiles,
            token: this.gamePin
        });
    }

    syncBoardFromSever(serverBoard, calculateResults: boolean = true) {
        if (serverBoard) {
            this.board.update(serverBoard);
            if (calculateResults) {
                this.boardService.calculateResults();
            }
        }
    }

    listenForChanges() {
        const game = this;
        this.socket.on(this.globals.socketCommands.board.updated, function (data) {
            console.log(data);
            if (data.token === game.gamePin) {
                game.syncBoardFromSever(data);
            }
        });
    }

    place(e: any): AppComponent {
        const game = this;
        if (this.currentTurn) {
            const id = e.target.id, row = id.substring(1, 2), col = id.substring(2, 3);
            this.socket.emit(this.globals.socketCommands.board.place, {
                token: this.board.token,
                placeX: col,
                placeY: row
            }, function(board) {
                game.syncBoardFromSever(board);
            });
        }
        return this;
    }

    validSector(row, col) {
        if (this.board.currentY === undefined && this.board.currentX === undefined) {
            return true;
        }

        if (Math.floor(row / 3) === this.board.currentY % 3) {
            if (Math.floor(col / 3) === this.board.currentX % 3) {
                return true;
            }
        }

        return false;
    }

    createBoard(): AppComponent {
        this.boardService.createBoard(this.globals.BOARD_SIZE);
        return this;
    }

    get board(): Board {
        return this.boardService.getBoard();
    }

    get resultBoard(): Board {
        return this.boardService.getResultBoard();
    }

    get currentTurn(): boolean {
        return this.board.turn === this.playerId;
    }

    get currentTurnMessage(): String {
        if (this.currentTurn) {
            return 'It is your turn!';
        }
        return 'It is ' + this.board.names[this.playerId === 1 ? 0 : 1] + '\'s turn!';
    }

    get validPlayer(): boolean {
        return (this.board.players >= this.globals.NUM_PLAYERS) && (this.playerId < this.globals.NUM_PLAYERS);
    }
}
