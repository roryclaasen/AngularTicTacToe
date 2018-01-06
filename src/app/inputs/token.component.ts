import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Globals, SocketCommands } from './../globals';

import { GUID } from './../util/guid';

@Component({
    selector: 'app-input-token',
    templateUrl: './token.component.html',
    styleUrls: ['./inputs.component.scss'],
    providers: []
})

export class TokenComponent {
    inputPrompt: String = 'Enter the game token';
    inputLabel: String = 'Token';
    inputToken: String = '';

    stage: PromptStage = PromptStage.options;

    gameFull: Boolean = false;

    @Output() tokenEvent: EventEmitter<Object> = new EventEmitter<Object>();

    @Input() socket: any;
    @Input() username: String;
    @Input() token: String;

    constructor(private globals: Globals) {}

    createGame(): void {
        const id = new GUID();
        const tokenEvent: EventEmitter<Object> = this.tokenEvent;
        this.socket.emit(SocketCommands.board.new, {
            username: this.username,
            guid: id.toString()
        }, function(data) {
            if (id.toString() === data.guid) {
                console.log('Creating game');
                tokenEvent.emit({ task: 'join', board: data.board });
            }
        });
    }

    changeStage(enumStage: number): void {
        this.inputToken = '';
        this.gameFull = false;
        if (enumStage === 0) {
            this.stage = PromptStage.options;
        } else if (enumStage === 1) {
            this.stage = PromptStage.tokenInput;
        }
    }

    continue(): void {
        const input = this.inputToken;
        const length = input.toString().length;
        if (length === 6 && input !== undefined) {
            this.token = input;

            const tokenEvent: EventEmitter<Object> = this.tokenEvent;
            const tokenComp = this;
            this.socket.emit(SocketCommands.game.join, {
                token: this.token,
                name: this.username
            }, function (serverData) {
                if (serverData.error) {
                    console.log('Could not join game: %s', serverData.error);
                    tokenComp.gameFull = true;
                } else {
                    console.log('Joining game');
                    tokenEvent.emit({ task: 'join', board: serverData });
                }
            });
        }
    }

    nameChange(): void {
        this.tokenEvent.emit({ task: 'back' });
    }

    get showOptions() {
        return this.stage === PromptStage.options;
    }

    get showInput() {
        return this.stage === PromptStage.tokenInput;
    }
}

enum PromptStage {
    options,
    tokenInput
}
