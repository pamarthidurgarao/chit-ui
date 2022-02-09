import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { InstalmentService } from "src/app/api/instalment.service";
import { ChitsService } from "../../../api/chits.service";

@Component({
  selector: "app-instalments",
  templateUrl: "./instalments.page.html",
  styleUrls: ["./instalments.page.scss"],
})
export class InstalmentsPage implements OnInit {
  chit: any = { instalments: [] };
  loader: any;
  instalments: any[] = [];
  constructor(
    private chitsService: ChitsService,
    private storage: Storage,
    public loadingController: LoadingController,
    private instalmentService: InstalmentService
  ) {}

  ngOnInit() {}

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

  ionViewWillEnter() {
    this.storage.get("singleChitti").then((val) => {
      this.getInstalments(val);
    });
  }

  chittiDetails(key) {
    this.loadingFunction("Please Wait..");
    this.chitsService.getChit(key).subscribe(
      (data) => {
        this.chit = data;
        setTimeout(() => {
          this.loaderDismiss();
        }, 800);
      },
      (error) => {
        setTimeout(() => {
          this.loadingFunction("something went wrong..!");
        }, 800);
      }
    );
  }

  getInstalments(chitId: string) {
    this.loadingFunction("Please Wait..");
    let query: any = {};
    query.chitId = chitId;
    this.instalmentService.getInstalmentByQuery(query).subscribe(
      (data: any) => {
        this.instalments = data;
        setTimeout(() => {
          this.loaderDismiss();
        }, 800);
      },
      (error) => {
        setTimeout(() => {
          this.loadingFunction("something went wrong..!");
        }, 800);
      }
    );
  }
}
