import { Injectable } from '@angular/core';
import { Board } from './board';
import { Player } from './player';

@Injectable()
export class BoardService {

    playerId = 1;
    board: Board;

    constructor() { }

    createBoard(size: number = 9): BoardService {
        const tiles = [];
        for (let y = 0; y < size; y++) {
            tiles[y] = [];
            for (let x = 0; x < size; x++) {
                tiles[y][x] = { used: false, class: '', status: '' };
            }
        }
        this.board = new Board({
            player: new Player({ id: this.playerId++ }),
            tiles: tiles
        });
        return this;
    }

    getBoard(): Board {
        return this.board;
    }
}
