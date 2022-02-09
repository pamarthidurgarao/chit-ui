import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { InstalmentsPageRoutingModule } from "./instalments-routing.module";
import { InstalmentsPage } from "./instalments.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstalmentsPageRoutingModule,
  ],
  declarations: [InstalmentsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InstalmentsPageModule {}
