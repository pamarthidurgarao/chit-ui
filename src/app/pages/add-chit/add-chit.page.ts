import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ChitsService } from "../../api/chits.service";

@Component({
  selector: "app-add-chit",
  templateUrl: "./add-chit.page.html",
  styleUrls: ["./add-chit.page.scss"]
})
export class AddChitPage implements OnInit {
  private addChit: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private chitsService: ChitsService
  ) {
    this.addChit = this.formBuilder.group({
      name: ["", [Validators.required, Validators.pattern("^[a-zA-Z]{1,18}$")]],
      amount: ["", [Validators.required, Validators.pattern("^[0-9]{1,7}$")]],
      chitType: ["Monthly", [Validators.required]],
      tenure: ["", [Validators.required, Validators.pattern("^[0-9]{1,2}$")]],
      chitDate: ["", [Validators.required]],
      membersSize: [20, [Validators.required]]
      // createdBy: ["", [Validators.required]]
    });
  }

  ngOnInit() {}

  back() {
    this.router.navigate(["/chits"]);
  }

  addChitMethod() {
    // console.log(this.addChit.value);
    this.chitsService.postChitti(this.addChit.value).subscribe(
      data => {
        console.log(data);
        this.addChit.reset();
      },
      error => {
        console.log(error);
      }
    );
  }
  onAmountChange($event) {
    debugger;
    for (let i = 0; i < this.addChit.value.amount.length; i++) {}
    if (this.addChit.value["amount"].length > 3) {
      let value = this.addChit.get("amount");
      let temValue = value;
      this.addChit.get("amount").setValue(temValue, { emitEvent: false });
    }
  }
}
