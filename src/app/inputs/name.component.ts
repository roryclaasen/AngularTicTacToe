import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-input-name',
    templateUrl: './name.component.html',
    styleUrls: ['./inputs.component.scss'],
    providers: []
})

export class NameComponent {
    inputPrompt: String = 'Enter your username';
    inputLabel: String = 'Username';
    input: String = '';

    @Output() valueEntered = new EventEmitter<String>();

    @Input() username: String;

    continue() {
        const input = this.input;
        const length = input.length;
        if (length > 3) {
            this.username = input;
            this.valueEntered.emit(this.username);
        }
    }
}
