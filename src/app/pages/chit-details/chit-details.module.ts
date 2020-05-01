import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from "@ionic/storage";
import { IonicModule } from '@ionic/angular';

import { ChitDetailsPageRoutingModule } from './chit-details-routing.module';

import { ChitDetailsPage } from './chit-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChitDetailsPageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [ChitDetailsPage]
})
export class ChitDetailsPageModule {}
