import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstalmentsPageRoutingModule } from './instalments-routing.module';

import { InstalmentsPage } from './instalments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstalmentsPageRoutingModule
  ],
  declarations: [InstalmentsPage]
})
export class InstalmentsPageModule {}
