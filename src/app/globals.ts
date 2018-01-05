import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import * as io from 'socket.io-client';

interface Response {
    results: string[];
}

@Injectable()
export class Globals {
    private http: HttpClient;
    socket: any = null;

    get NUM_PLAYERS(): number {
        return 2;
    }

    get BOARD_SIZE(): number {
        return 9;
    }

    get GRID_SIZE(): number {
        return 3;
    }

    gameUrl(includePort: boolean = true) {
        return location.protocol + '//' + location.hostname + ((location.port && includePort) ? ':' + location.port : '');
    }

    constructor(http: HttpClient) {
        this.http = http;
    }

    getSocket(): any {
        const promise = new Promise((resolve, reject) => {
            if (this.socket !== null) {
                resolve(this.socket);
            } else {
                this.socket = io(this.gameUrl());
                resolve(this.socket);
            }
        });
        return promise;
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
