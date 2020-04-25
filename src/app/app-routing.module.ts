import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SigninComponent } from "./signin/signin.component";
import { CheeptipataComponent } from "./cheeptipata/cheeptipata.component";
import { SignupComponent } from "./signup/signup.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { HomePage } from "./home/home.page";

const routes: Routes = [
  {
    path: 'home',
    component:HomePage
  },
{
  path: '',
    component:WelcomeComponent
},
{
  path: 'signin',
    component:SigninComponent
},
{
  path: 'signup',
    component:SignupComponent
},
{
  path: 'cheeptipata',
    component:CheeptipataComponent
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
