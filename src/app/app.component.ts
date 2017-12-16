import { Component, Input, Output, EventEmitter } from '@angular/core';

import io from 'socket.io-client';

import { Globals } from './globals';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'TicTacToe';
    navbar = false;

    loaded = false; // false;

    inputPrompt = 'Enter your username';
    inputLabel = 'Username';
    input = '';
    inputType = 'text';

    username = '';
    gamePin = '';

    inputs = {
        'id': undefined,
        'username': undefined
    };

    socket: any = null;

    constructor(private globals: Globals) {
        globals.getSocket().then(data => this.socket = data);
    }

    validate(): void {
        const input = this.input;
        const length = input.length;
        if (length > 0) {
            if (this.username.length === 0) {
                this.username = input;
                this.input = '';
                this.inputPrompt = 'Enter the Game Pin or Create a server';
                this.inputLabel = 'Game Pin';
                this.inputType = 'number';
            } else {
                this.joinServer(input);
            }
        }
    }

    resetInputs(): void {
        this.username = this.input = '';
        this.inputType = 'text';
        this.inputPrompt = 'Enter your username';
        this.inputLabel = 'Username';
    }

    joinServer(gamePin): void {
        this.socket.emit('bored:join', {
            token: gamePin,
            name: this.username
        });
        this.socket.on('bored:joined', function (data) {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log('Joined game %s', data.token);
                this.join(data.token);
            }
        }.bind(this));
    }

    createServer(): void {
        this.socket.emit('bored:new', this.username);
        this.socket.on('bored:created', function (data) {
            this.join(data.token);
        }.bind(this));
    }

    join(gamePin): void {
        this.gamePin = gamePin;
        this.inputs = {
            'id': this.gamePin,
            'username': this.username
        };
        this.loaded = true;
    }
}
