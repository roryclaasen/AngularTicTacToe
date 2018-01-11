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
    letterShowDisabled: Boolean = false;
    changeColorsID: String = 'changeColorTheme';
    backgroundImageID: String = 'showBackgroundImage';
    backgroundImageDisabled: Boolean = false;

    @Input() gameData: GameData;

    selectedValue: any;

    ngOnInit(): void {
        this.gameData.updateThemeFromCookies();
        this.selectedValue = this.gameTheme.themes[this.gameTheme.themeId];
        this.updateDisabledOptions();
    }

    updateLetters(data: any): void {
        this.gameTheme.showLetters = data.target.checked;
    }

    updateBackground(data: any): void {
        this.gameTheme.showBackground = data.target.checked;
        this.updateTheme();
    }

    updateTheme(): void {
        this.updateDisabledOptions();

        this.gameTheme.themeId = this.gameTheme.themes.indexOf(this.selectedValue);
        let body = document.getElementsByTagName('body')[0];
        body.className = '';
        body.classList.add(this.selectedValue.class);

        if (this.selectedValue.hasBackground && this.gameTheme.showBackground) {
            body.classList.add('bg-image');
        }
    }

    updateCookies(): void {
        this.gameData.setThemeToCookie();
    }

    updateDisabledOptions(): void {
        let letters = this.selectedValue.letters;
        if (letters !== undefined) { this.letterShowDisabled = letters; } else { this.letterShowDisabled = false; }

        let background = this.selectedValue.hasBackground;
        if (background !== undefined) { this.backgroundImageDisabled = !background; } else { this.backgroundImageDisabled = false; }
    }

    get gameTheme(): any {
        return this.gameData.theme;
    }
}
