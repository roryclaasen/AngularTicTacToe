import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Globals, SocketCommands, TokenStage } from './../util/globals';

import { GUID } from './../util/guid';

@Component({
    selector: 'app-input-token',
    templateUrl: './token.component.html',
    styleUrls: ['./inputs.component.scss'],
    providers: []
})

export class TokenComponent implements OnInit {
    inputPrompt: String = 'Enter the game token';
    inputLabel: String = 'Token';
    inputToken: String = '';

    stage: TokenStage = TokenStage.options;

    gameFull: Boolean = false;

    joinError: String;

    @Output() tokenEvent: EventEmitter<Object> = new EventEmitter<Object>();

    @Input() socket: any;
    @Input() username: String;
    @Input() token: String;

    ngOnInit(): void {
        this.inputToken = '';
    }

    createGame(): void {
        const id = new GUID();
        const tokenEvent: EventEmitter<Object> = this.tokenEvent;
        this.socket.emit(SocketCommands.board.new, {
            username: this.username,
            guid: id.toString()
        }, function(data) {
            if (id.toString() === data.guid) {
                console.log('Creating game');
                tokenEvent.emit({ task: 'join', id: 0, board: data.board });
            }
        });
    }

    changeStage(enumStage: number): void {
        this.inputToken = '';
        this.gameFull = false;
        this.joinError = '';
        if (enumStage === 0) {
            this.stage = TokenStage.options;
            this.socket.emit(SocketCommands.board.remove, this.token);
        } else if (enumStage === 1) {
            this.stage = TokenStage.tokenInput;
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
                    console.log('Could not join playable game: %s', serverData.error);
                    tokenComp.joinError = serverData.error;
                    tokenComp.gameFull = true;
                    if (serverData.spectating) {
                        tokenEvent.emit({ task: 'join', id: -1, board: serverData });
                    }
                } else {
                    console.log('Joining game');
                    tokenEvent.emit({ task: 'join', id: 1, board: serverData });
                }
            });
        }
    }

    nameChange(): void {
        this.inputToken = '';
        this.tokenEvent.emit({ task: 'back' });
    }

    get showOptions(): Boolean {
        return this.stage === TokenStage.options;
    }

    get showInput(): Boolean {
        return this.stage === TokenStage.tokenInput;
    }
}
