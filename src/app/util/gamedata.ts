import { Board } from './../board';

export class GameData {
    username: String;
    token: String;
    spectating: Boolean = false;
    playerId: Number;

    board: Board;

    constructor() {
        this.board = new Board();
    }
}

export enum GameStage {
    username,
    token,
    game
}
