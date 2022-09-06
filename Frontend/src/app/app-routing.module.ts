import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostmenuComponent } from './postmenu/postmenu.component';
import { SignUpComponent } from './sign-up/sign-up.component';



const routes : Routes = [
{path: "signup", component: SignUpComponent},
{path: "", component: LoginComponent},
{path: "postmenu",component: PostmenuComponent},
]

@NgModule({
imports: [
  RouterModule.forRoot(routes)
],
exports: [
  RouterModule
]

})
export class AppRoutingModule {}