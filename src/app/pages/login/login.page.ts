import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private storage: Storage,
    private googlePlus: GooglePlus
  ) { }

  ngOnInit() {
  }

  fb() {
    this.router.navigate(["/home"]);
  }

  gmail() {
    // this.router.navigate(["/home"]);
    this.googlePlus.login({})
      .then(res => {
        debugger
        this.router.navigate(["/home"]);
        console.log(res)
      })
      .catch(err => {
        debugger
        console.error(err)
      });
  }

}
