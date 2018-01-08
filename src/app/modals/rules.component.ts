import { Component } from '@angular/core';

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./modals.component.scss'],
    providers: []
})

export class RulesComponent {

    modalId: String = 'rulesModal';

    title: String = 'Rules';
    titleId: String = 'rules';
}
