import { Component } from '@angular/core';
import { BoardService } from '../board.service';
import { Board } from '../board';

const BOARD_SIZE = 9;

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    providers: [BoardService]
})

export class GameComponent {
    canPlay = true;
    player = 0;
    players = 0;
    gameId: string;

    winner=  false;

    constructor(private boardService: BoardService) {
        this.createBoard();
        this.listenForChanges();
    }

    listenForChanges(): GameComponent {
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
        if (!this.checkValidHit(tile)) {
            return;
        }
        this.board.tiles[row][col].used = true;
        this.board.tiles[row][col].class = 'cross';
        return this;
    }

    checkValidHit(tile: any): boolean {
        if (this.winner) {
            return false;
        }
        if (tile.class.length > 0) {
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
}
