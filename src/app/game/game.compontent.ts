import { Component, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BoardService } from '../board.service';
import { Board } from '../board';

import { Globals } from '../globals';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    providers: [BoardService]
})

export class GameComponent {

    socket: any = null;
    playerId = 0;

    @Output()
    valuesEntered = new EventEmitter();

    private _gameData;

    @Input()
    set gameData(value) {
        this._gameData = value;
        this.valuesEntered.next({ value: 'changed to ' + this._gameData });
        this.listenForChanges();
    }

    get gameData() {
        return this._gameData;
    }

    winner = false;

    currentY: number;
    currentX: number;

    gameUrl: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

    constructor(private boardService: BoardService, private toastr: ToastsManager, private _vcr: ViewContainerRef, private globals: Globals) {
        this.toastr.setRootViewContainerRef(_vcr);
        this.createBoard();
        globals.getSocket().then(data => this.socket = data);
    }

    listenForChanges(): GameComponent {
        this.socket.on(this.globals.socketCommands.board.updated, function (data) {
            if (this.board.token === this.gameData.id) {
                this.board.names = data.names;
                this.board.token = data.token;
                this.board.turn = data.turn;

                this.playerId = this.board.userId(this.gameData.username);
                this.socket.emit(this.globals.socketCommands.board.updateTiles, {
                    tiles: this.board.tiles,
                    token: this.board.token
                });
            }
            if (data.token === this.board.token) {
                this.board.turn = data.turn;
                this.board.tiles = data.tiles;

                this.boardService.calculateResults();
            }
        }.bind(this));
        return this;
    }

    place(e: any): GameComponent {
        if (this.currentTurn) {
            const id = e.target.id, row = id.substring(1, 2), col = id.substring(2, 3), tile = this.board.tiles[row][col];
            if (!this.checkValidHit(row, col, tile)) {
                return;
            }
            this.currentY = row;
            this.currentX = col;

            this.board.tiles[row][col].used = true;
            this.board.tiles[row][col].class = (this.playerId === 1) ? 'cross' : 'nought' ;

            this.boardService.calculateResults();

            this.socket.emit(this.globals.socketCommands.board.updateTiles, {
                tiles: this.board.tiles,
                token: this.board.token
            });
        }
        return this;
    }

    checkValidHit(row: number, col: number, tile: any): boolean {
        if (this.winner) {
            return false;
        }
        if (tile.class.length > 0) {
            return false;
        }
        if (!this.validSector(row, col)) {
            return false;
        }
        return true;
    }

    createBoard(): GameComponent {
        this.boardService.createBoard(this.globals.BOARD_SIZE);
        return this;
    }

    get board(): Board {
        return this.boardService.getBoard();
    }

    get resultBoard(): Board {
        return this.boardService.getResultBoard();
    }

    validSector(row: number, col: number): boolean {
        if (this.currentY === undefined && this.currentX === undefined) {
            return true;
        }

        if (Math.floor(row / 3) === this.currentY % 3) {
            if (Math.floor(col / 3) === this.currentX % 3) {
                return true;
            }
        }

        return false;
    }

    get currentTurn(): boolean {
        return this.board.turn === this.playerId;
    }

    get validPlayer(): boolean {
        return (this.board.players >= this.globals.NUM_PLAYERS) && (this.playerId < this.globals.NUM_PLAYERS);
    }
}
