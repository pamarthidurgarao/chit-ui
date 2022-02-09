import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";
import { ChitsService } from "../../../api/chits.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"]
})
export class DetailsPage implements OnInit {
  user: any = {};
  loader: any;
  chit: any = { "createdBy": {} };

  constructor(
    private chitsService: ChitsService,
    private router: Router,
    private storage: Storage,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) { }

  async loadingFunction(loadmsg) {
    this.loader = await this.loadingController.create({
      message: loadmsg,
      spinner: "lines"
    });
    await this.loader.present();
  }

  ngOnInit() {
    this.loadUser();
  }

  async loaderDismiss() {
    this.loader = await this.loadingController.dismiss();
  }

  loadUser() {
    this.storage.get("loggedUser").then(resp => {
      this.user = JSON.parse(resp);
    });
  }

  ionViewWillEnter() {
    this.storage.get("singleChitti").then(val => {
      this.chittiDetails(val);
    });
  }

  chittiDetails(key) {
    this.loadingFunction("Please Wait..");
    this.chitsService.getChit(key).subscribe(
      data => {
        this.chit = data;
        this.loaderDismiss();
      },
      error => {
        this.loadingFunction("something went wrong..!");
      }
    );
  }

  chitDeleteRequest(id) {
    this.chitsService.deleteChit(id).subscribe(
      data => {
        this.router.navigate(["/chits"]);
        this.storage.set(
          "chitSharedMessage",
          "<ion-icon class='icon-message success' name='checkmark-circle-outline'></ion-icon> This Group Successfully Deleted."
        );
      },
      error => {
        console.log(error);
        this.networkError();
      }
    );
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

  async chitDelete(id) {
    const alert = await this.alertController.create({
      message:
        "<ion-icon class='icon-message delete' name='hand-right-outline'></ion-icon> Are you Delete this Group",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Delete",
          handler: () => {
            this.chitDeleteRequest(id);
          }
        }
      ]
    });
    await alert.present();
  }

  editChit() {
    this.router.navigate(['/add-chit', 'Edit'], { queryParams: { chitId: this.chit._id } });
  }
}
