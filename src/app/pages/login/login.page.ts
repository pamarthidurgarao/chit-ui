import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/api/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginResp: any = {};
  loader: any;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private storage: Storage,
    private googlePlus: GooglePlus,
    private userService: UserService,
    public loadingController: LoadingController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }

  // fb() {
  //   let user =
  //     '{"_id": {"$oid": "61fcd06a56a64c0004b19673"},"firstName": "durgarao","lastName": "pamarthi", "displayName": "pamarthi durgarao", "email": "pamarthi18@gmail.com","imageUrl": "https://lh3.googleusercontent.com/a-/AAuE7mCREaxWPUNp6lhuJ_bu6oCIsVraZ6OCUkaw1RNB5A", "googleId": "101394875460614457933","__v": 0}';
  //   this.storage.set("loggedUser", user);
  //   this.router.navigate(["/home"]);
  // }

  async onLogin() {
    debugger;
    let user: any = await this.userService.searchUser(this.loginForm.value);
    if (user.length > 0) {
      await this.storage.set("loggedUser", JSON.stringify(user[0]));
      this.router.navigate(["/home"]);
    }
  }

  gmail() {
    this.loadingFunction("Please Wait..");
    this.googlePlus
      .login({
        webClientId:
          "775707897426-9l00utnr7vvhkq892c06oro1nmmi5im1.apps.googleusercontent.com",
        offline: true,
      })
      .then((res) => {
        this.loginResp = res;
        this.createOrUpdateAndNavigate();
      })
      .catch((err) => {
        console.error(err);
        this.loaderDismiss();
      });
  }

  async loadingFunction(loadmsg) {
    this.loader = await this.loadingController.create({
      message: loadmsg,
      spinner: "lines",
    });
    await this.loader.present();
  }

  async loaderDismiss() {
    this.loader = await this.loadingController.dismiss();
  }

  createUser(data) {
    this.userService.createUser(data).subscribe((resp: any) => {
      this.storage.set("loggedUser", JSON.stringify(resp.user));
      this.router.navigate(["/home"]);
      this.loaderDismiss();
    });
  }

  searchUser(query) {
    this.userService.searchMember(query).subscribe((resp) => {});
  }

  async createOrUpdateAndNavigate() {
    let query: any = {};
    let sub: any = {};
    sub.email = this.loginResp.email;
    sub.googleId = this.loginResp.userId;
    query["$or"] = [sub];

    let data: any = await this.userService.searchUser(query);
    debugger;
    if (data.length > 0) {
      this.storage.set("loggedUser", JSON.stringify(data[0]));
      this.router.navigate(["/home"]);
      this.loaderDismiss();
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

  onAddUser() {}
}
