import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RequestsService } from "../api/requests.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  requests;
  constructor(
    private router: Router,
    private requestService: RequestsService
  ) { }

  ngOnInit() {
    this.loadRequests();
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  addMsg() {
  }
  chitGroupLink() {
    this.router.navigate(["/chits"]);
  }
  createGroup() {
    this.router.navigate(["/add-chit"]);
  }

  loadRequests() {
    let query: any = {};
    query.user = "5e9c17036bf4e37664eba7a6";
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
}
