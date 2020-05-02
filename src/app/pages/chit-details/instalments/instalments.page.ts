import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ChitsService } from "../../../api/chits.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-instalments",
  templateUrl: "./instalments.page.html",
  styleUrls: ["./instalments.page.scss"]
})
export class InstalmentsPage implements OnInit {
  singleChittiDetails: any = [
    {
      instalments: []
    }
  ];
  constructor(
    private chitsService: ChitsService,
    private router: Router,
    private storage: Storage,
    public loadingController: LoadingController
  ) {}
  ngOnInit() {}
  loader: any;
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
  ionViewWillEnter() {
    this.storage.get("singleChitti").then(val => {
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
}
