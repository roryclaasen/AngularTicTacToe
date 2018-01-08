import { Component, OnInit } from '@angular/core';
import { Globals, GameData, AppStage} from './util/globals';
import { Howler } from './util/audio';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: []
})

export class AppComponent implements OnInit {
    title: String = 'Ultimate Tic Tac Toe';
    navbar: Boolean = false;
    socket: any;

    inputTitle: String = this.title;

    gameData: GameData;

    private stage: AppStage;

    ngOnInit(): void {
        Globals.getSocket().then(data => this.socket = data);
        this.gameData = new GameData();
        this.stage = AppStage.username;
        Howler.load();
    }

    usernameChaged(username: string): void {
        this.gameData.username = username;
        console.log('Username has been changed to \'%s\'', username);

        this.stage = AppStage.token;
    }

    tokenChaged(data: any): void {
        switch (data.task) {
            case ('back'): {
                this.gameData.token = undefined;
                this.stage = AppStage.username;
                break;
            }
            case ('join'): {
                if (data.board.error) {
                    this.gameData.spectating = true;
                }
                this.gameData.playerId = data.id;
                this.gameData.token = data.board.token;
                console.log('Game Token has been set to \'%s\'', this.gameData.token);
                this.gameData.board.update(data.board);
                this.stage = AppStage.game;
                break;
            }
        }
    }

    gameEvent(data: any): void {
        switch (data.task) {
            case ('exit'): {
                this.gameData.token = undefined;
                this.gameData.spectating = false;
                this.stage = AppStage.token;
                break;
            }
        }
    }

    get showInputUsername(): Boolean {
        return this.stage === AppStage.username;
    }

    get showInputToken(): Boolean {
        return this.stage === AppStage.token;
    }

    get showInputs(): Boolean {
        return this.showInputUsername || this.showInputToken;
    }

    get showGame(): Boolean {
        return this.stage === AppStage.game;
    }

    get showFooter(): Boolean {
        return !this.showGame;
    }
}

