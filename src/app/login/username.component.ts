import { Component } from '@angular/core';

@Component({
    selector: 'app-content',
    templateUrl: './username.component.html'
})

export class UsernameComponent {
    header: string = 'Tic-Tac-Toe';

    inputPrompt: string = 'Enter your username';
    inputLabel: string = 'Username';
    input: string = '';
    inputLength: number = 24;
    inputType: string = 'text';

    username: string = '';
    gamePin: string = '';

    validate(): void {
        var input = this.input;
        var length = input.length;
        if (length > 0) {
            if (this.username.length == 0) {
                this.username = this.header = input;
                this.input = '';
                this.inputPrompt = 'Enter the Game Pin or Create a server';
                this.inputLabel = 'Game Pin';
                this.inputLength = 6;
                this.inputType = 'number';
            } else {
                this.join(input);
            }
        }
    }

    createServer(): void {
        // TODO Generate Game pointer
        // this.join( .. );
    }

    join(gamePin): void {
        this.gamePin = gamePin;
    }
}
