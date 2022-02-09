import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Socket } from "ngx-socket-io";
import { BidService } from "src/app/api/bid.service";
import { ChitsService } from "src/app/api/chits.service";
import { InstalmentService } from "src/app/api/instalment.service";

@Component({
  selector: "app-bids",
  templateUrl: "./bids.page.html",
  styleUrls: ["./bids.page.scss"],
})
export class BidsPage implements OnInit {
  bids = [];
  user: any = {};
  chitId = "";
  amount = 0;
  chit: any = {};

  constructor(
    private socket: Socket,
    private storage: Storage,
    private bidService: BidService,
    private chitsService: ChitsService,
    private instalmentService: InstalmentService
  ) {}

  ngOnInit() {
    this.loadUser();
    this.storage.get("singleChitti").then((val) => {
      this.chitId = val;
      this.chittiDetails(val);
      this.loadBids();
      this.socket.connect();
      this.socket.fromEvent(val).subscribe((message) => {
        this.loadBids();
      });
    });
  }

  loadBids() {
    let data: any = {};
    data.chit = this.chitId;
    this.bidService.loadBids(data).subscribe((resp: any) => {
      this.bids = resp;
      console.log(resp);
    });
  }

  loadUser() {
    this.storage.get("loggedUser").then((resp) => {
      this.user = JSON.parse(resp);
    });
  }

  bid(amount: number) {
    let data: any = {};
    data.chit = this.chitId;
    data.amount = this.prepareBidAmount(amount);
    data.bidUser = this.user._id;
    data.createDate = new Date();
    this.bidService.createBid(data).subscribe((resp) => {
      console.log("create");
    });
  }

  prepareBidAmount(amount: number) {
    if (this.bids[this.bids.length - 1]) {
      return parseInt(this.bids[this.bids.length - 1].amount) + amount;
    }
    return amount;
  }
  presentModal() {}

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  chittiDetails(key) {
    this.chitsService.getChit(key).subscribe(
      (data) => {
        this.chit = data;
      },
      (error) => {
        console.log("error");
      }
    );
  }

  async createInstalment() {
    let data: any = {};
    let bid = this.bids[this.bids.length - 1];
    data.amount = bid.amount;
    data.bidUser = bid.bidUser;
    data.chitId = this.chit._id;
    // instalment date need to change
    data.instalmentDate = new Date();
    data.chitDate = new Date();
    data.users = [];
    await this.chit.members.forEach((element) => {
      let user: any = {};
      user.paymentStatus = "UNPAID";
      user.user = element._id;
      data.users.push(user);
    });
    this.instalmentService.createInstalment(data).subscribe((resp) => {
      console.log("instalment created");
    });
  }

  deleteBid(bid) {
    this.bidService.deleteBid(bid._id).subscribe((res) => {
      console.log("bid deleted");
      this.loadBids();
    });
  }
}
