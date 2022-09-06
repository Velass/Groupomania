import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { LoginComponent, } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './error.service';
import { PostmenuComponent } from './postmenu/postmenu.component';



@NgModule({
  
  declarations: [
    AppComponent,
    HeaderHomeComponent,
    LoginComponent,
    SignUpComponent,
    PostmenuComponent,
  
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [{provide: ErrorHandler, useClass: GlobalErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }

