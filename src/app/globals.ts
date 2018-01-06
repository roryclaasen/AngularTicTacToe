import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

import * as io from 'socket.io-client';

@Injectable()
export class Globals {
    private socket: any = null;

    public static get NUM_PLAYERS(): number {
        return 2;
    }

    public static get BOARD_SIZE(): number {
        return 9;
    }

    public static get GRID_SIZE(): number {
        return 3;
    }

    gameUrl(includePort: boolean = true) {
        return location.protocol + '//' + location.hostname + ((location.port && includePort) ? ':' + location.port : '');
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
