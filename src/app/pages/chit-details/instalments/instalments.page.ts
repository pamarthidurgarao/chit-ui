import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChitsService } from "../../../api/chits.service";

@Component({
  selector: 'app-instalments',
  templateUrl: './instalments.page.html',
  styleUrls: ['./instalments.page.scss'],
})
export class InstalmentsPage implements OnInit {
  singleChittiDetails: any = [{
    instalments: []
  }];
  constructor(private chitsService: ChitsService, private router: Router) { }

  ngOnInit() {
    this.chittiDetails();
  }
  chittiDetails() {
    let key = localStorage.getItem('singleChitti');
    this.chitsService.getSingleChittiDetails(key).subscribe(data => {
       console.log(data);
      this.singleChittiDetails = data;
    }, error => {
      console.log('error');
    })
  }

}
