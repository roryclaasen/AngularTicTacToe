import { Component, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BoardService } from '../board.service';
import { Board } from '../board';

declare const Pusher: any;
const NUM_PLAYERS = 2;
const BOARD_SIZE = 9;

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    providers: [BoardService]
})

export class GameComponent {

    pusherChannel: any;

    canPlay = true;
    player = 0;
    players = 0;

    @Output()
    valuesEntered = new EventEmitter();

    private _gameData;

    @Input()
    set gameData(value) {
        this._gameData = value;
        this.valuesEntered.next({ value: 'changed to ' + this._gameData });
        this.initPusher();
        this.listenForChanges();
    }

    get gameData() {
        return this._gameData;
    }

    winner = false;

    currentY: number;
    currentX: number;

    gameUrl: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

    constructor(private boardService: BoardService, private toastr: ToastsManager, private _vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(_vcr);
        this.createBoard();
    }

    initPusher(): GameComponent {
        console.log(this.gameData);
        const pusher = new Pusher('98657ea4123db5df46a6', {
            authEndpoint: '/pusher/auth',
            cluster: 'eu'
        });
        this.pusherChannel = pusher.subscribe(this.gameData.id);
        this.pusherChannel.bind('pusher:member_added', member => this.players++);
        this.pusherChannel.bind('pusher:subscription_succeeded', members => {
            this.players = members.count;
            this.setPlayer(this.players);
            this.toastr.success('Success', 'Connected!');
        });
        this.pusherChannel.bind('pusher:member_removed', member => this.players--);

        return this;
    }

    listenForChanges(): GameComponent {
        this.pusherChannel.bind('client-fire', (obj) => {
            this.canPlay = !this.canPlay;
            this.board[obj.boardId] = obj.board;
        });
        return this;
    }

    setPlayer(players: number = 0): GameComponent {
        this.player = players - 1;
        if (players === 1) {
            this.canPlay = true;
        } else if (players === 2) {
            this.canPlay = false;
        }
        return this;
    }

    place(e: any): GameComponent {
        const id = e.target.id, row = id.substring(1, 2), col = id.substring(2, 3), tile = this.board.tiles[row][col];
        if (!this.checkValidHit(row, col, tile)) {
            return;
        }
        this.currentY = row;
        this.currentX = col;

        this.board.tiles[row][col].used = true;
        this.board.tiles[row][col].class = (this.player === 1) ? 'cross' : 'nought' ; // TODO get player color

        this.boardService.calculateResults();

        this.pusherChannel.trigger('client-fire', {
            player: this.player,
            board: this.board
        });

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
        this.boardService.createBoard(BOARD_SIZE);
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

    get validPlayer(): boolean {
        return (this.players >= NUM_PLAYERS) && (this.player < NUM_PLAYERS);
    }
}
