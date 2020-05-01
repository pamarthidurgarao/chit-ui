import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddChitPageRoutingModule } from './add-chit-routing.module';

import { AddChitPage } from './add-chit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddChitPageRoutingModule
  ],
  declarations: [AddChitPage]
})
export class AddChitPageModule {}
