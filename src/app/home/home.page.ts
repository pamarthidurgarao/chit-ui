import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { RequestsService } from "../api/requests.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  user: any = {};
  requests = [];
  constructor(
    private router: Router,
    private requestService: RequestsService,
    private storage: Storage
  ) {}

  ngOnInit() {
    // let user = '{"_id": {"$oid": "5ec92f4e8b37690004ba7841"},"firstName": "durgarao","lastName": "pamarthi", "displayName": "pamarthi durgarao", "email": "pamarthi18@gmail.com","imageUrl": "https://lh3.googleusercontent.com/a-/AAuE7mCREaxWPUNp6lhuJ_bu6oCIsVraZ6OCUkaw1RNB5A", "googleId": "101394875460614457933","__v": 0}';
    // this.storage.set("loggedUser", user);
    this.storage.get("loggedUser").then((resp) => {
      this.user = JSON.parse(resp);
      this.loadRequests();
    });
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  chitGroupLink() {
    this.router.navigate(["/chits"]);
  }
  createGroup() {
    this.router.navigate(["/add-chit", "Add"]);
  }

  loadRequests() {
    let query: any = {};
    query.user = this.user._id;
    query.status = true;
    this.requestService.getRequests(query).subscribe((resp: any) => {
      this.requests = resp;
      console.log(resp);
    });
  }

  action(id, status) {
    this.requestService.requestAction(id, status).subscribe((resp) => {
      this.loadRequests();
    });
  }

  bid() {}

  logout() {
    this.router.navigate(["/login"]);
    this.storage.remove("loggedUser");
  }
}
