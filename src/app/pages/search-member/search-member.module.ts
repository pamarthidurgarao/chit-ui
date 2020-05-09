import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SearchMemberPageRoutingModule } from "./search-member-routing.module";

import { SearchMemberPage } from "./search-member.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchMemberPageRoutingModule
  ],
  declarations: [SearchMemberPage],
  entryComponents: [SearchMemberPage]
})
export class SearchMemberPageModule {}
