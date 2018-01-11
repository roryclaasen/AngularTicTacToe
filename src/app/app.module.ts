import { BrowserModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { NameComponent } from './inputs/name.component';
import { TokenComponent } from './inputs/token.component';
import { GameComponent } from './game/game.component';

import { RulesComponent } from './modals/rules.component';
import { AboutComponent } from './modals/about.component';
import { ThemeComponent } from './modals/theme.component';

import { GUID } from './util/guid';

@NgModule({
    declarations: [
        AppComponent,
        NameComponent,
        TokenComponent,
        GameComponent,
        RulesComponent,
        AboutComponent,
        ThemeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        CookieModule.forRoot()
    ],
    providers: [ GUID ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
