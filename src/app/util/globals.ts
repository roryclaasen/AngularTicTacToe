import { Board } from './board';

import { environment } from './../../environments/environment';

import * as io from 'socket.io-client';

export class Globals {
    private static socket: any = null;

    public static get NUM_PLAYERS(): number {
        return 2;
    }

    public static get BOARD_SIZE(): number {
        return 9;
    }

    public static get GRID_SIZE(): number {
        return 3;
    }

    public static gameUrl(includePort: boolean = true) {
        return location.protocol + '//' + location.hostname + ((location.port && includePort) ? ':' + location.port : '');
    }

    public static getSocket(): any {
        const promise = new Promise((resolve, reject) => {
            if (Globals.socket !== null) {
                resolve(Globals.socket);
            } else {
                Globals.socket = io(Globals.gameUrl());
                resolve(Globals.socket);
            }
        });
        return promise;
    }
}

export class GameData {
    username: String;
    token: String;
    spectating: Boolean = false;
    playerId: Number;

    board: Board;

    theme: any = {
        showLetter: true
    };

    constructor() {
        this.board = new Board();
        this.username = '';
    }
}

export class SocketCommands {
    public static game = {
        join: 'board:join'
    };

    public static board = {
        new: 'board:new',
        place: 'board:place',
        update: 'board:update',
        updated: 'board:updated',
        remove: 'board:remove',
        removed: 'board:removed'
    };

    public static user = {
        disconnected: 'user:left'
    };
}

export enum AppStage {
    username,
    token,
    game
}

export enum TokenStage {
    options,
    tokenInput
}

export enum GameStage {
    lobbyWaiting,
    lobbyLeft,
    game,
    results,
    left
}
