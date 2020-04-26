import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChitsService } from "../../../api/chits.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  singleChittiDetails: any = [{
    amount: '',
    name: '',
    tenure: '',
    membersSize: '',
    chitType: '',
    chitDate: '',
    createDate: ''

  }];
  constructor(private chitsService: ChitsService, private router: Router) { }

   ngOnInit() {
    this.chittiDetails();
  }
  chittiDetails() {
    let key = localStorage.getItem('singleChitti');
    this.chitsService.getSingleChittiDetails(key).subscribe(data => {
     // console.log(data);
       this.singleChittiDetails = data;
    }, error => {
      console.log('error');
    })
  }
}
