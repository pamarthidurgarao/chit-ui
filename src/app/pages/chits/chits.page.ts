import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChitsService } from "../../api/chits.service";

@Component({
  selector: 'app-chits',
  templateUrl: './chits.page.html',
  styleUrls: ['./chits.page.scss'],
})
export class ChitsPage implements OnInit {
  cheepipata: any[];
  constructor(private chitsService: ChitsService, private router: Router) { }

  ngOnInit() {
    this.getChittis();
  }

  getChittis() {
    this.chitsService.getChittiDetails().subscribe(data => {
      // console.log(data);
      this.cheepipata = data;
    }, error => {
      console.log('error');
    })
  }
  ngOnDestroy() {

  }
  chittiDetails(item) {
    debugger
    // localStorage.setItem('singleChitti', item);
    this.router.navigate(['/chit-details/'+item]);
  }
}
