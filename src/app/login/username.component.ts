import { Component } from '@angular/core';

@Component({
    selector: 'app-content',
    templateUrl: './username.component.html'
})
export class UsernameComponent {
    username: string = '';
    inputLength: number = 24;

    validate(): void {
        var username = this.username;
        var length = username.length;
        if (length > 0) {

        }
    }
}
