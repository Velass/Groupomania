import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PostmenuComponent } from './postmenu/postmenu.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes : Routes = [
{path: "login", component: LoginComponent},
{path: "signup", component: SignUpComponent},
{path: "postmenu",component: PostmenuComponent},
{path: "postmenu/:id",component: PostDetailComponent},
{path: "",redirectTo: "login", pathMatch: "full"},
{path: "**", component: PageNotFoundComponent},
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