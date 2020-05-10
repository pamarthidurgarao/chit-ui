import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {}
  fb() {
   this.router.navigate(["/home"]);
  }
  gmail() {
   this.router.navigate(["/home"]);
  }
}
