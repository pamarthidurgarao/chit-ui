import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SigninComponent } from "./signin/signin.component";
import { CheeptipataComponent } from "./cheeptipata/cheeptipata.component";
import { SignupComponent } from "./signup/signup.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { HomePage } from "./home/home.page";
import { SingleChittiComponent } from "./single-chitti/single-chitti.component";
import { InstalmentsComponent } from "./instalments/instalments.component";
import { MembersComponent } from "./members/members.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'cheeptipata',
    component: CheeptipataComponent
  },
  {
    path: 'singleChitti',
    component: SingleChittiComponent,
    children: [
      {
        path: '',
        component: MembersComponent
      },
      {
        path: 'Instalments',
        component: InstalmentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
