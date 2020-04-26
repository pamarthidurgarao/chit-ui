import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChitsPage } from './chits.page';

const routes: Routes = [
  {
    path: '',
    component: ChitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChitsPageRoutingModule {}
