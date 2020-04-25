import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CheepipataService } from "../services/cheepipata.service";

@Component({
  selector: 'app-cheeptipata',
  templateUrl: './cheeptipata.component.html',
  styleUrls: ['./cheeptipata.component.scss'],
})
export class CheeptipataComponent implements OnInit, OnDestroy {
  cheepipata: any[];
  constructor(private cheepipataService: CheepipataService, private router: Router) { }

  ngOnInit() {
    this.getChittis();
  }

  getChittis() {
    this.cheepipataService.getChittiDetails().subscribe(data => {
      // console.log(data);
      this.cheepipata = data;
    }, error => {
      console.log('error');
    })
  }
  ngOnDestroy() {

  }
  chittiDetails(item) {
    localStorage.setItem('singleChitti', item);
    this.router.navigate(['/singleChitti']);
  }
}
