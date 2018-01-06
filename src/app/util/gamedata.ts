import { Board } from './../board';

export class GameData {
    username: String;
    token: String;
    spectating: Boolean = false;

    board: Board;

    constructor() {
        this.board = new Board();
    }

    get playerId(): Number {
        return this.board.userId(this.username);
    }
}

export enum GameStage {
    username,
    token,
    game
}
