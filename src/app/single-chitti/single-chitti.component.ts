import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CheepipataService } from "src/app/services/cheepipata.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-chitti',
  templateUrl: './single-chitti.component.html',
  styleUrls: ['./single-chitti.component.scss'],
})
export class SingleChittiComponent implements OnInit {

  constructor(private cheepipataService: CheepipataService, private router: Router) { }
  singleChittiDetails: any = [{
    amount: '',
    name: '',
    tenure: '',
    membersSize: '',
    chitType: '',
    chitDate: '',
    createDate: '',
    createdBy: [],
    members: [],
    instalments: []

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
  back() {
    this.router.navigate(['/cheeptipata']);
  }
}
