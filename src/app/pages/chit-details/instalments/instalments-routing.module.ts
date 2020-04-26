import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstalmentsPage } from './instalments.page';

const routes: Routes = [
  {
    path: '',
    component: InstalmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstalmentsPageRoutingModule {}
