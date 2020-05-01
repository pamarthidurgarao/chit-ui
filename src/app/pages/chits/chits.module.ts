import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicStorageModule } from "@ionic/storage";
import { IonicModule } from "@ionic/angular";

import { ChitsPageRoutingModule } from "./chits-routing.module";

import { ChitsPage } from "./chits.page";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChitsPageRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [ChitsPage]
})
export class ChitsPageModule {}
