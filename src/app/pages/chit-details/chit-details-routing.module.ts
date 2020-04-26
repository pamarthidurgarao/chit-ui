import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChitDetailsPage } from './chit-details.page';

const routes: Routes = [
  {
    path: '',
    component: ChitDetailsPage,
    children: [
      {
        path: 'members',
        loadChildren: () => import('./members/members.module').then(m => m.MembersPageModule)
  },
{
  path: 'details',
    loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule)
},
{
  path: 'instalments',
    loadChildren: () => import('./instalments/instalments.module').then(m => m.InstalmentsPageModule)
},
{
  path: '',
    redirectTo: '/chit-details/details',
      pathMatch: 'full'
}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChitDetailsPageRoutingModule { }
