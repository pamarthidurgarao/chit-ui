import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  MenuController
} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ChitsService } from "../../api/chits.service";

@Component({
  selector: "app-chits",
  templateUrl: "./chits.page.html",
  styleUrls: ["./chits.page.scss"],
})
export class ChitsPage implements OnInit {
  cheepipata: any[];
  cheepipataResults: any[];
  searchInput = "";
  loader: any;
  user: any = {};
  sharedMessage = null;

  constructor(
    private chitsService: ChitsService,
    private router: Router,
    public loadingController: LoadingController,
    private storage: Storage,
    public alertController: AlertController,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  ionViewWillEnter() {
    this.storage.get("chitSharedMessage").then((val) => {
      this.sharedMessage = val;
      if (this.sharedMessage != null) {
        this.presentAlert();
      }
    });
  }

  loadUser() {
    this.storage.get("loggedUser").then((resp) => {
      this.user = JSON.parse(resp);
      this.getChits();
    });
  }

  ionViewWillLeave() {
    this.sharedMessage = null;
    this.storage.remove("chitSharedMessage");
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      message: this.sharedMessage,
      buttons: [
        {
          text: "OK",
          role: "cancel",
          handler: () => {
            this.sharedMessage = null;
            this.storage.remove("chitSharedMessage");
          },
        },
      ],
    });
    await alert.present();
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
  getChits() {
    this.loadingFunction("Please Wait..");
    let query: any = {};
    let members: any = {};
    members.members = {};
    members.members._id = this.user._id;
    let createdBy: any = {};
    createdBy.createdBy = this.user._id;
    query["$or"] = [members, createdBy];
    this.chitsService.getChits(query).subscribe(
      (resp: any) => {
        this.cheepipata = resp;
        this.cheepipataResults = resp;
        this.loaderDismiss();
      },
      (error) => {
        this.loaderDismiss();
      }
    );
  }

  chittiDetails(item) {
    this.storage.set("singleChitti", item);
    this.router.navigate(["/chit-details"]);
  }

  back() {
    this.router.navigate(["/home"]);
  }

  addChit() {
    this.router.navigate(["/add-chit", "Add"]);
  }

  search() {
    this.cheepipataResults = this.cheepipata.filter((item) => {
      return this.getValues(item);
    });
  }

  getValues(obj) {
    for (var i in obj) {
      if (
        obj[i] != null &&
        obj[i] != undefined &&
        obj[i]
          .toString()
          .toLowerCase()
          .indexOf(this.searchInput.toLowerCase()) > -1
      ) {
        return true;
      }
    }
    return false;
  }

  async networkError() {
    const alert = await this.alertController.create({
      message: "Something went wrong..! please try Later.",
      buttons: [
        {
          text: "OK",
          role: "cancel",
        },
      ],
    });
    await alert.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  menuClick() {
    this.menu.enable(true, "custom");
    this.menu.open("custom");
  }

  closeMenu() {
    this.menu.close("custom");
    this.menu.enable(false, "custom");
  }
}
