import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ChitsService } from "../../../api/chits.service";
import { LoadingController, ModalController, AlertController } from "@ionic/angular";
import { SearchMemberPage } from "./search-member/search-member.page";
import { RequestsService } from "../../../api/requests.service";

@Component({
  selector: "app-members",
  templateUrl: "./members.page.html",
  styleUrls: ["./members.page.scss"]
})
export class MembersPage implements OnInit {
  chitId = "";
  user: any = {}
  chit: any = { "createdBy": {} };
  loader: any;

  constructor(
    private chitsService: ChitsService,
    private storage: Storage,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private requestsService: RequestsService,
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
      this.chitId = val;
      this.chittiDetails();
    });
  }

  chittiDetails() {
    this.loadingFunction("Please Wait..");
    this.chitsService.getChit(this.chitId).subscribe(data => {
      this.chit = data;
      this.loaderDismiss();
    },
      error => {
        this.loadingFunction("something went wrong..!");
      }
    );
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchMemberPage
    });
    modal.present();
    modal.onDidDismiss().then(res => {
      if (res.data.data) {
        this.createRequest(res.data.data);
      }

    });
  }

  createRequest(value) {
    let data: any = {};
    data.chit = this.chitId;
    data.user = value._id;
    data.status = true;
    data.requestDate = new Date();

    this.requestsService.createRequest(data).subscribe(
      resp => {
        this.chittiDetails();
        this.successMessage(
          "<ion-icon class='icon-message success' name='checkmark-circle-outline'></ion-icon> Request sent Successfully."
        );
      },
      error => {
        this.networkError();
      }
    );
  }

  async networkError() {
    const alert = await this.alertController.create({
      message:
        "<ion-icon class='icon-message delete' name='hand-right-outline'></ion-icon> Something went wrong..! please try Later.",
      buttons: [
        {
          text: "OK",
          role: "cancel"
        }
      ]
    });
    await alert.present();
  }


  async successMessage(value) {
    const alert = await this.alertController.create({
      message: value,
      buttons: [
        {
          text: "OK",
          role: "cancel"
        }
      ]
    });
    await alert.present();
  }

}
