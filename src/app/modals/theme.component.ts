import { Component, OnInit, Input } from '@angular/core';
import { GameData } from '../util/globals';

@Component({
    selector: 'app-module-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./modals.component.scss'],
    providers: []
})

export class ThemeComponent implements OnInit {
    modalId: String = 'themeModal';

    title: String = 'Change Theme';
    titleId: String = 'theme';

    letterShowID: String = 'showLetterCheck';
    changeColorsID: String = 'changeColorTheme';

    @Input() gameData: GameData;

    selectedValue: any;

    ngOnInit(): void {
        this.gameData.updateThemeFromCookies();
        this.selectedValue = this.gameTheme.themes[this.gameTheme.themeId];
    }

    updateChecked(data): void {
        this.gameTheme.showLetter = data.target.checked;
    }

    updateTheme(): void {
        this.gameTheme.themeId = this.gameTheme.themes.indexOf(this.selectedValue);
        let body = document.getElementsByTagName('body')[0];
        body.className = '';
        body.classList.add(this.selectedValue.class);
    }

    updateCookies(): void {
        this.gameData.setThemeToCookie();
    }

    get gameTheme(): any {
        return this.gameData.theme;
    }
}
