import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChitsService } from "../../../api/chits.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  singleChittiDetails: any = [{
    members: []
  }];
  constructor(private chitsService: ChitsService, private router: Router) { }

  ngOnInit() {
    this.chittiDetails();
  }
  chittiDetails() {
    let key = localStorage.getItem('singleChitti');
    this.chitsService.getSingleChittiDetails(key).subscribe(data => {
      this.singleChittiDetails = data;
      // console.log(this.singleChittiDetails);
    }, error => {
      console.log('error');
    })
  }

}
