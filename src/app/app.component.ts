import { Component } from '@angular/core';
import { Globals } from './globals';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: []
})

export class AppComponent {
    title: String = 'Ultimate Tic Tac Toe';
    navbar: Boolean = true;
    socket: any;

    inputTitle: String = this.title;

    gameData: GameData;

    constructor(private globals: Globals) {
        globals.getSocket().then(data => this.socket = data);
        this.gameData = new GameData();
        this.gameData.username = '';
    }

    usernameChaged(username: string): void {
        this.gameData.username = username;
        console.log('Username has been changed to \'%s\'', username);

        this.gameData.stage = GameStage.token;
    }

    tokenChaged(data: any): void {
        switch (data.task) {
            case ('back'): {
                this.gameData.token = undefined;
                this.gameData.stage = GameStage.username;
                break;
            }
            case ('join'): {
                this.gameData.token = data.token;
                console.log('Game Token has been set to \'%s\'', this.gameData.token);

                this.gameData.stage = GameStage.game;
                // TODO Send server request to join
                break;
            }
            case ('create'): {
                // TODO Send server request to create
                this.gameData.stage = GameStage.game;
                break;
            }
        }
    }

    get showInputUsername(): Boolean {
        return this.gameData.stage === GameStage.username;
    }

    get showInputToken(): Boolean {
        return this.gameData.stage === GameStage.token;
    }

    get showInputs(): Boolean {
        return this.showInputUsername || this.showInputToken;
    }
}

class GameData {
    username: String;
    token: String;

    stage: GameStage = GameStage.username;

    constructor() {}
}

enum GameStage {
    username,
    token,
    game
}
