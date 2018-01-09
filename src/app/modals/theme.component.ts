import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameData } from '../util/globals';

@Component({
    selector: 'app-module-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./modals.component.scss'],
    providers: []
})

export class ThemeComponent {
    modalId: String = 'themeModal';

    title: String = 'Change Theme';
    titleId: String = 'theme';

    letterShowID: String = 'showLetterCheck';

    @Output() themeEvent: EventEmitter<Object> = new EventEmitter<Object>();

    @Input() gameTheme: any;

    updateChecked(data): void {
        this.gameTheme.showLetter = data.target.checked;
    }

    updateTheme(): void {
        this.themeEvent.emit({
            task: 'update',
            theme: this.gameTheme
        });
    }
}
