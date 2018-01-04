import { BrowserModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Globals } from './globals';
import { GUID } from './guid';

@NgModule({
    declarations: [
        AppComponent
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
