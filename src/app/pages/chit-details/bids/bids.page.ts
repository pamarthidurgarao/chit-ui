import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Storage } from '@ionic/storage';
import { BidService } from 'src/app/api/bid.service';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.page.html',
  styleUrls: ['./bids.page.scss'],
})
export class BidsPage implements OnInit {

  bids = [];
  chitId = '';
  amount = 0;

  constructor(private socket: Socket, private storage: Storage, private bidService: BidService) { }

  ngOnInit() {
    this.storage.get("singleChitti").then(val => {
      this.chitId = val;
      this.loadChits();
      this.socket.connect();
      this.socket.fromEvent(val).subscribe(message => {
        this.loadChits();
      });
    });
  }

  loadChits() {
    let data: any = {};
    data.chit = this.chitId;
    this.bidService.loadBids(data).subscribe((resp: any) => {
      this.bids = resp;
      console.log(resp);
    });
  }
  bid() {
    let data: any = {};
    data.chit = this.chitId;
    data.amount = this.amount;
    data.bidUser = '5e9c17036bf4e37664eba7a6';
    data.createDate = new Date();
    this.bidService.createBid(data).subscribe(resp => {
      console.log("create");
      this.amount = 0;
    });
  }
  presentModal(){}
}
