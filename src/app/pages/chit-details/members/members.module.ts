import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { MembersPageRoutingModule } from "./members-routing.module";

import { MembersPage } from "./members.page";
import { SearchMemberPage } from "./search-member/search-member.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MembersPageRoutingModule
  ],
  declarations: [MembersPage, SearchMemberPage],
  entryComponents: [SearchMemberPage]
})
export class MembersPageModule {}
