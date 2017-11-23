import { Component } from '@angular/core';

@Component({
    selector: 'app-content',
    templateUrl: './username.component.html'
})

export class UsernameComponent {
    inputPrompt: string = 'Enter your username';
    inputLabel: string = 'Username';
    input: string = '';
    inputType: string = 'text';

    username: string = '';
    gamePin: string = '';
    
    validate(): void {
        var input = this.input;
        var length = input.length;
        if (length > 0) {
            if (this.username.length == 0) {
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
        // TODO Generate Game pointer
        // this.join( .. );
    }

    join(gamePin): void {
        this.gamePin = gamePin;
    }
}
