import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SigninComponent } from "./signin/signin.component";
import { CheeptipataComponent } from "./cheeptipata/cheeptipata.component";
import { SignupComponent } from "./signup/signup.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { FooterComponent } from "./footer/footer.component";
import { HomePage } from "./home/home.page";
import { SingleChittiComponent } from "./single-chitti/single-chitti.component";

@NgModule({
  declarations: [HomePage, AppComponent, SingleChittiComponent, SigninComponent, WelcomeComponent, SignupComponent, CheeptipataComponent, FooterComponent],
  entryComponents: [HomePage, SigninComponent, WelcomeComponent, SignupComponent, CheeptipataComponent, FooterComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
