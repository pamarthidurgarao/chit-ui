import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMemberPage } from './search-member.page';

const routes: Routes = [
  {
    path: '',
    component: SearchMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchMemberPageRoutingModule {}
