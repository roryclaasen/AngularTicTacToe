import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import io from 'socket.io-client';

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

    get socketCommands() {
        // TODO: Always Copy from socket.js
        return {
            board: {
                new: 'board:new',
                created: 'board:created',
                updateTiles: 'board:updateTiles',
                updated: 'board:updated',
                remove: 'board:remove',
                removed: 'board:removed'
            },
            game: {
                join: 'board:join',
                joined: 'board:joined'
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
                this.http.get<Response>('/getport').subscribe(data => {
                    this.socketPort = data['port'];
                    let address = 'http://localhost:' + this.socketPort;
                    if (environment.production) {
                        address = 'https://localhost:' + this.socketPort;
                    }
                    this.socket = io(address);
                    resolve(this.socket);
                });
            }
        });
        return promise;
    }
}

