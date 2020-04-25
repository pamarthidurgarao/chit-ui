import { Component, OnInit } from '@angular/core';
import { CheepipataService } from "src/app/services/cheepipata.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-chitti-details',
  templateUrl: './single-chitti-details.component.html',
  styleUrls: ['./single-chitti-details.component.scss'],
})
export class SingleChittiDetailsComponent implements OnInit {
  constructor(private cheepipataService: CheepipataService, private router: Router) { }
  singleChittiDetails: any = [{
    amount: '',
    name: '',
    tenure: '',
    membersSize: '',
    chitType: '',
    chitDate: '',
    createDate: '',
    createdBy: []

  }];
  ngOnInit() {
    this.chittiDetails();
  }
  chittiDetails() {
    let key = localStorage.getItem('singleChitti');
    this.cheepipataService.getSingleChittiDetails(key).subscribe(data => {
      console.log(data);
      this.singleChittiDetails = data;
    }, error => {
      console.log('error');
    })
  }

}
