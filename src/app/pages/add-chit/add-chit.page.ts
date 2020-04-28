import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-chit',
  templateUrl: './add-chit.page.html',
  styleUrls: ['./add-chit.page.scss'],
})
export class AddChitPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  back() {
    this.router.navigate(['/chits']);
  }
}
