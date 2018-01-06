import { Component } from '@angular/core';
import { Globals } from './globals';
import { GameData, GameStage } from './util/gamedata';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: []
})

export class AppComponent {
    title: String = 'Ultimate Tic Tac Toe';
    navbar: Boolean = false;
    socket: any;

    inputTitle: String = this.title;

    gameData: GameData;

    private stage: GameStage;

    constructor(private globals: Globals) {
        globals.getSocket().then(data => this.socket = data);
        this.gameData = new GameData();
        this.stage = GameStage.username;
    }

    usernameChaged(username: string): void {
        this.gameData.username = username;
        console.log('Username has been changed to \'%s\'', username);

        this.stage = GameStage.token;
    }

    tokenChaged(data: any): void {
        switch (data.task) {
            case ('back'): {
                this.gameData.token = undefined;
                this.stage = GameStage.username;
                break;
            }
            case ('join'): {
                this.gameData.token = data.board.token;
                console.log('Game Token has been set to \'%s\'', this.gameData.token);
                this.gameData.board.update(data.board);
                this.stage = GameStage.game;
                break;
            }
        }
    }

    gameEvent(data: any): void {
        switch (data.task) {
            case ('exit'): {
                this.gameData.token = undefined;
                this.stage = GameStage.token;
                break;
            }
        }
    }

    get showInputUsername(): Boolean {
        return this.stage === GameStage.username;
    }

    get showInputToken(): Boolean {
        return this.stage === GameStage.token;
    }

    get showInputs(): Boolean {
        return this.showInputUsername || this.showInputToken;
    }

    get showGame(): Boolean {
        return this.stage === GameStage.game;
    }
}

