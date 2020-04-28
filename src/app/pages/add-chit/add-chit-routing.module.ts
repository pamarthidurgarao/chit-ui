import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddChitPage } from './add-chit.page';

const routes: Routes = [
  {
    path: '',
    component: AddChitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddChitPageRoutingModule {}
