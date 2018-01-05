import { BrowserModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NameComponent } from './inputs/name.component';
import { TokenComponent } from './inputs/token.component';
import { GameComponent } from './game/game.component';

import { Globals } from './globals';
import { GUID } from './util/guid';

@NgModule({
    declarations: [
        AppComponent,
        NameComponent,
        TokenComponent,
        GameComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule
    ],
    providers: [ Globals, GUID ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
