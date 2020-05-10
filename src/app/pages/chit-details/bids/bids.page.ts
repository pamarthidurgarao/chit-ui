import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.page.html',
  styleUrls: ['./bids.page.scss'],
})
export class BidsPage implements OnInit {

  constructor(private socket: Socket, private storage: Storage) { }

  ngOnInit() {
    this.storage.get("singleChitti").then(val => {
      this.socket.connect();
      this.socket.fromEvent(val).subscribe(message => {
        debugger

      });
    });
  }

}
