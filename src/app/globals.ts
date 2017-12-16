import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import io from 'socket.io-client';

interface Response {
    results: string[];
}

@Injectable()
export class Globals {
    private http: HttpClient;
    socketPort: number;
    socket: any = null;

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
                    this.socket = io('http://localhost:' + this.socketPort);
                    resolve(this.socket);
                });
            }
        });
        return promise;
    }
}

