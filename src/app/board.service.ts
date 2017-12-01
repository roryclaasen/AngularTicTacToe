import { Injectable } from '@angular/core';
import { Board } from './board';
import { Player } from './player';

@Injectable()
export class BoardService {

    board: Board;
    results: Board;

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
            tiles: tiles
        });
        return this.createResultsBoard(3);
    }

    createResultsBoard(size: number = 3): BoardService {
        const tiles = [];
        for (let y = 0; y < size; y++) {
            tiles[y] = [];
            for (let x = 0; x < size; x++) {
                tiles[y][x] = { class: '' };
            }
        }
        this.results = new Board({
            tiles: tiles
        });
        return this;
    }

    calculateResults(): BoardService {
        for (let sY = 0; sY < 3; sY ++) {
            for (let sX = 0; sX < 3; sX++) {
                if (this.results.tiles[sY][sX].class.length === 0) {
                    const y = sY * 3, x = sX * 3;
                    let compleate = false;

                    for (let tY = y; tY < y + 3; tY ++) {
                        const tClass = this.board.tiles[tY][x].class;
                        if (tClass.length === 0) { continue; }
                        if (tClass === this.board.tiles[tY][x + 1].class && tClass === this.board.tiles[tY][x + 2].class) {
                            this.results.tiles[sY][sX].class = tClass;
                            compleate = true;
                        }
                    }

                    if (compleate) { continue; }

                    for (let tX = x; tX < x + 3; tX++) {
                        const tClass = this.board.tiles[y][tX].class;
                        if (tClass.length === 0) { continue; }
                        if (tClass === this.board.tiles[y + 1][tX].class && tClass === this.board.tiles[y + 2][tX].class) {
                            this.results.tiles[sY][sX].class = tClass;
                            compleate = true;
                        }
                    }

                    if (compleate) { continue; }

                    let tClass = this.board.tiles[y][x].class;

                    if (tClass.length > 0) {
                        if (tClass === this.board.tiles[y + 1][x + 1].class && tClass === this.board.tiles[y + 2][x + 2].class) {
                            this.results.tiles[sY][sX].class = tClass;
                            compleate = true;
                        }
                    }

                    if (compleate) { continue; }

                    tClass = this.board.tiles[y + 2][x].class;

                    if (tClass.length > 0) {
                        if (tClass === this.board.tiles[y + 1][x + 1].class && tClass === this.board.tiles[y][x + 2].class) {
                            this.results.tiles[sY][sX].class = tClass;
                            compleate = true;
                        }
                    }
                }
            }
        }
        return this;
    }

    getBoard(): Board {
        return this.board;
    }

    getResultBoard(): Board {
        return this.results;
    }
}
