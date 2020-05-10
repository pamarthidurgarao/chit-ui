import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'chits',
    loadChildren: () => import('./pages/chits/chits.module').then( m => m.ChitsPageModule)
  },
  {
    path: 'chit-details',
    loadChildren: () => import('./pages/chit-details/chit-details.module').then( m => m.ChitDetailsPageModule)
  },
  {
    path: 'add-chit/:mode',
    loadChildren: () => import('./pages/add-chit/add-chit.module').then( m => m.AddChitPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
