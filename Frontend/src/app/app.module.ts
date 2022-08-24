
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeBarComponent } from './home-bar/home-bar.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import * as fr from "@angular/common/locales/fr"

@NgModule({
  declarations: [
    AppComponent,
    HomeBarComponent,
    LoginComponent,
    PostComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{provide: LOCALE_ID, useValue: "fr-FR"}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
 }
