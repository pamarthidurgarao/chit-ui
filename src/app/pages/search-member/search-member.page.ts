import { Component, OnInit } from "@angular/core";
import { ChitsService } from "../../api/chits.service";
import { AlertController, ModalController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-search-member",
  templateUrl: "./search-member.page.html",
  styleUrls: ["./search-member.page.scss"]
})
export class SearchMemberPage implements OnInit {
  constructor(
    private chitsService: ChitsService,
    public alertController: AlertController,
    public modalController: ModalController,
    private storage: Storage
  ) {}
  searchInput = "";
  members = [];
  ngOnInit() {}
  search() {
    let data: any = {};
    data.firstName = {};
    data.firstName.$regex = this.searchInput + "*";
    data.firstName.$options = "si";
    this.chitsService.searchMember(data).subscribe(
      resp => {
        this.members = resp;
      },
      error => {
        this.networkError();
      }
    );
  }
  async selectMember(value) {
    await this.modalController.dismiss({ data: value });
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
  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
