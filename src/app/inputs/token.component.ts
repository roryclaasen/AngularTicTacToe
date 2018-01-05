import { Component, Input, Output, EventEmitter } from '@angular/core';

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

    @Output() tokenEvent = new EventEmitter<Object>();

    @Input() token: String;

    createGame(): void {
        // TODO Ask Server to create game
        this.tokenEvent.emit({ task: 'create' });
    }

    changeStage(enumStage: number) {
        if (enumStage === 0) {
            this.stage = PromptStage.options;
            this.inputToken = '';
        } else if (enumStage === 1) {
            this.stage = PromptStage.tokenInput;
        }
    }

    continue(): void {
        const input = this.inputToken;
        const length = input.toString().length;
        if (length === 6 && input !== undefined) {
            this.token = input;
            this.tokenEvent.emit({ task: 'join', token: this.token });
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
