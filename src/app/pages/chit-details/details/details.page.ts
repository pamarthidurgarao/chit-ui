import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ChitsService } from "../../../api/chits.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"]
})
export class DetailsPage implements OnInit {
  singleChittiDetails: any = [
    {
      amount: "",
      name: "",
      tenure: "",
      membersSize: "",
      chitType: "",
      chitDate: "",
      createDate: ""
    }
  ];
  constructor(
    private chitsService: ChitsService,
    private router: Router,
    private storage: Storage,
    public loadingController: LoadingController
  ) {}
  loader: any;
  async loadingFunction(loadmsg) {
    this.loader = await this.loadingController.create({
      message: loadmsg,
      spinner: "lines"
    });
    await this.loader.present();
  }

  ngOnInit() {}
  async loaderDismiss() {
    this.loader = await this.loadingController.dismiss();
  }
  ionViewWillEnter() {
    this.storage.get("singleChitti").then(val => {
      this.chittiDetails(val);
    });
  }
  chittiDetails(key) {
    this.loadingFunction("Please Wait..");
    this.chitsService.getSingleChittiDetails(key).subscribe(
      data => {
        // console.log(data);
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
}
