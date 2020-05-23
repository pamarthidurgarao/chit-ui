import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {

  loginResp: any = {};

  constructor(
    private router: Router,
    private storage: Storage,
    private googlePlus: GooglePlus,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  fb() {
    this.router.navigate(["/home"]);
  }

  gmail() {
    this.googlePlus.login({})
      .then(res => {
        this.loginResp = res
        this.createOrUpdateAndNavigate();
      })
      .catch(err => {
        console.error(err)
      });
  }

  createUser(data) {
    this.userService.createUser(data).subscribe((resp: any) => {

      this.storage.set("loggedUser", JSON.stringify(resp.user));
      this.router.navigate(["/home"]);
    })
  }

  searchUser(query) {
    this.userService.searchMember(query).subscribe(resp => {

    })
  }

  async createOrUpdateAndNavigate() {
    let query: any = {};
    let sub: any = {};
    sub.email = this.loginResp.email;
    sub.googleId = this.loginResp.userId;
    query['$or'] = [sub];

    let data: any = await this.userService.searchUser(query);
    debugger
    if (data.length > 0) {
      this.storage.set("loggedUser", JSON.stringify(data[0]));
      this.router.navigate(["/home"]);
    } else {
      let data: any = {};
      data.firstName = this.loginResp.familyName;
      data.lastName = this.loginResp.givenName;
      data.displayName = this.loginResp.displayName;
      data.email = this.loginResp.email;
      data.imageUrl = this.loginResp.imageUrl;
      data.googleId = this.loginResp.userId;
      this.createUser(data);
    }
  }
}
