import { Component } from '@angular/core';

@Component({
    selector: 'app-module-about',
    templateUrl: './about.component.html',
    styleUrls: ['./modals.component.scss'],
    providers: []
})

export class AboutComponent {
    modalId: String = 'aboutModal';

    title: String = 'About';
    titleId: String = 'about';
}
