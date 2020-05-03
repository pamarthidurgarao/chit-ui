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
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message:
        "<ion-icon class='icon-message success' name='checkmark-circle-outline'></ion-icon> Chit Group Added Successfully",
      buttons: ["OK"]
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
        setTimeout(() => {
          this.loadingFunction("something went wrong..!");
        }, 1000);
      }
    );
  }

  chittiDetails(item) {
    this.storage.set("singleChitti", item);
    //localStorage.setItem("singleChitti", item);
    this.router.navigate(["/chit-details"]);
  }
  back() {
    this.router.navigate(["/home"]);
  }
  addChit() {
    this.router.navigate(["/add-chit"]);
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
}
