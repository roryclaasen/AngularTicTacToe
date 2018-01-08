import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-input-name',
    templateUrl: './name.component.html',
    styleUrls: ['./inputs.component.scss'],
    providers: []
})

export class NameComponent implements OnInit {
    inputPrompt: String = 'Enter your username';
    inputLabel: String = 'Username';
    input: String = '';

    @Output() valueEntered: EventEmitter<String> = new EventEmitter<String>();

    @Input() username: String;

    ngOnInit(): void {
        if (this.username.length > 0) {
            this.input = this.username;
        }
    }

    continue() {
        const input = this.input;
        const length = input.length;
        if (length > 3) {
            this.username = input;
            this.valueEntered.emit(this.username);
        }
    }
}
