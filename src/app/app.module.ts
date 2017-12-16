import { BrowserModule  } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.compontent';
import { Globals } from './globals';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        // BrowserAnimationsModule,
        ToastModule.forRoot(),
        HttpClientModule
    ],
    providers: [ Globals ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
