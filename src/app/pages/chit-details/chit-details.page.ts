import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ChitsService } from "../../api/chits.service";

@Component({
  selector: "app-chit-details",
  templateUrl: "./chit-details.page.html",
  styleUrls: ["./chit-details.page.scss"]
})
export class ChitDetailsPage implements OnInit {
  chitName = "";
  constructor(private chitsService: ChitsService, private router: Router, private storage: Storage) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.storage.get("singleChitti").then(val => {
      this.chittiDetails(val);
    });
  }

  chittiDetails(key) {
    this.chitsService.getChit(key).subscribe(data => {
      this.chitName = data.name;
    }, error => {
      console.log("error");
    }
    );
  }

  back() {
    this.storage.remove("singleChitti");
    this.router.navigate(["/chits"]);
  }

}
