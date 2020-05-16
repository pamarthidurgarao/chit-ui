import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChitsService } from "../../api/chits.service";
import { LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-chits",
  templateUrl: "./chits.page.html",
  styleUrls: ["./chits.page.scss"]
})
export class ChitsPage implements OnInit {
  cheepipata: any[];
  cheepipataResults: any[];
  searchInput = "";
  loader: any;

  constructor(
    private chitsService: ChitsService,
    private router: Router,
    public loadingController: LoadingController,
    private storage: Storage,
    public alertController: AlertController
  ) {}

  ngOnInit() {}
  sharedMessage = null;
  ionViewWillEnter() {
    this.getChittis();
    this.storage.get("chitSharedMessage").then(val => {
      this.sharedMessage = val;
      if (this.sharedMessage != null) {
        this.presentAlert();
      }
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
          }
        }
      ]
    });

    await alert.present();
  }

  async loadingFunction(loadmsg) {
    this.loader = await this.loadingController.create({
      message: loadmsg,
      spinner: "lines"
    });
    await this.loader.present();
  }

  async loaderDismiss() {
    this.loader = await this.loadingController.dismiss();
  }
  getChittis() {
    this.loadingFunction("Please Wait..");
    this.chitsService.getChittiDetails().subscribe(
      data => {
        this.cheepipata = data;
        this.cheepipataResults = data;
        setTimeout(() => {
          this.loaderDismiss();
        }, 1000);
      },
      error => {
        this.networkError();
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
    this.router.navigate(["/add-chit",'add']);
  }
  search() {
    this.cheepipataResults = this.cheepipata.filter(item => {
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
          role: "cancel"
        }
      ]
    });

    await alert.present();
  }
   doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
