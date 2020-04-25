import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheepipataService } from "../services/cheepipata.service";

@Component({
  selector: 'app-cheeptipata',
  templateUrl: './cheeptipata.component.html',
  styleUrls: ['./cheeptipata.component.scss'],
})
export class CheeptipataComponent implements OnInit, OnDestroy {

  constructor(private cheepipataService: CheepipataService) { }

  ngOnInit() {
    this.getChittis();
  }

  getChittis() {
    this.cheepipataService.getChittiDetails().subscribe(data => {
      console.log(data);
    }, error => {
      console.log('error');
    })
  }
  ngOnDestroy() {
    
  }
}
