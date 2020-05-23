import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ChitsService } from "../../../api/chits.service";
import {
  LoadingController,
  ModalController,
  AlertController
} from "@ionic/angular";
import { SearchMemberPage } from "./search-member/search-member.page";
import { RequestsService } from "../../../api/requests.service";

@Component({
  selector: "app-members",
  templateUrl: "./members.page.html",
  styleUrls: ["./members.page.scss"]
})
export class MembersPage implements OnInit {
  private addMember: FormGroup;
  chitId = "";
  user: any = {}
  singleChittiDetails: any = { "createdBy": {} };

  constructor(
    private chitsService: ChitsService,
    private router: Router,
    private storage: Storage,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private requestsService: RequestsService,
    public alertController: AlertController
  ) {
    this.addMember = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: ["", [Validators.required, Validators.pattern("^[7-9][0-9]{9}$")]]
    });
  }

  loader: any;

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
      this.chittiDetails(val);
    });
  }

  chittiDetails(key) {
    this.loadingFunction("Please Wait..");
    this.chitsService.getSingleChittiDetails(key).subscribe(
      data => {
        this.singleChittiDetails = data;
        setTimeout(() => {
          this.loaderDismiss();
        }, 800);
      },
      error => {
        setTimeout(() => {
          this.loadingFunction("something went wrong..!");
        }, 800);
      }
    );
  }

  addMemberSubmit(): void {
    console.log("data");
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
        this.chittiDetails(this.chitId);
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
