import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RequestsService } from '../api/requests.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  requests;
  constructor(private router: Router, private requestService: RequestsService, private socket: Socket) { }

  ngOnInit() {
    this.loadRequests();
    this.socket.connect();
    this.socket.fromEvent('message').subscribe(message => {
      debugger
      
    });
  }

  addMsg() {
    this.socket.emit('send-message', { text: "hell0" });
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
    });
  }

  action(id, status) {
    this.requestService.requestAction(id, status).subscribe(resp => {
      this.loadRequests();
    });

  }
}
