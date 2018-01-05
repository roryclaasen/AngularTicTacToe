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

    @Output() valueEntered = new EventEmitter<String>();

    @Input() token: String;

    createGame(): void {
        // TODO Ask Server to create game
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
            this.valueEntered.emit(this.token);
        }
    }

    nameChange(): void {
        this.valueEntered.emit(undefined);
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
