import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RequestsService } from "../api/requests.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  user;
  requests;
  constructor(
    private router: Router,
    private requestService: RequestsService,
    private storage: Storage
  ) { }

  ngOnInit() {
    let user = '{"_id": "5e9c17036bf4e37664eba7a6", "firstName": "Durga Rao", "lastName": "Pamarthi", "__v": 0}';
    this.storage.set("loggedUser", user);
    this.storage.get('loggedUser').then(resp => {
      this.user = JSON.parse(resp);
      this.loadRequests();
    });
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  chitGroupLink() {
    this.router.navigate(["/chits"]);
  }
  createGroup() {
    this.router.navigate(["/add-chit", 'Add']);
  }

  loadRequests() {
    let query: any = {};
    query.user = this.user._id;
    query.status = true;
    this.requestService.getRequests(query).subscribe(resp => {
      this.requests = resp;
      console.log(resp);
    });
  }

  action(id, status) {
    this.requestService.requestAction(id, status).subscribe(resp => {
      this.loadRequests();
    });
  }

  bid() {

  }
}
