import { Component, Input, Output, EventEmitter } from '@angular/core';

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
        'id': '',
        'username': ''
    };

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
                this.join(input);
            }
        }
    }

    resetInputs(): void {
        this.username = this.input = '';
        this.inputType = 'text';
        this.inputPrompt = 'Enter your username';
        this.inputLabel = 'Username';
    }

    createServer(): void {
        this.join(this.getUniqueId());
    }

    join(gamePin): void {
        this.gamePin = gamePin;
        this.inputs = {
            'id': this.gamePin,
            'username': this.username
        };
        this.loaded = true;
    }

    getUniqueId(): number {
        return Math.floor(100000 + Math.random() * 900000);
    }
}
