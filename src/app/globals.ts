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
    socketPort: number;
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

    get socketCommands() {
        // TODO: Always Copy from socket.js
        return {
            board: {
                new: 'board:new',
                updateTiles: 'board:updateTiles',
                place: 'board:place',
                update: 'board:update',
                updated: 'board:updated',
                remove: 'board:remove',
                removed: 'board:removed'
            },
            game: {
                join: 'board:join'
            }
        };
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

