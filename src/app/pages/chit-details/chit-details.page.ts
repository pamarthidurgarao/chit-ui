import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChitsService } from "../../api/chits.service";

@Component({
  selector: 'app-chit-details',
  templateUrl: './chit-details.page.html',
  styleUrls: ['./chit-details.page.scss'],
})
export class ChitDetailsPage implements OnInit {
  chitname = '';
  constructor(private chitsService: ChitsService, private router: Router) { }

  ngOnInit() {
    this.chittiDetails();
  }
  chittiDetails() {
    let key = localStorage.getItem('singleChitti');
    this.chitsService.getSingleChittiDetails(key).subscribe(data => {
     this.chitname = data.name;
    }, error => {
      console.log('error');
    })
  }
  back() {
    this.router.navigate(['/chits']);
  }
}
