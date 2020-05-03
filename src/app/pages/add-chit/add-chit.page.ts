import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from "@ionic/storage";
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
    public loadingController: LoadingController,
    private storage: Storage,
    private chitsService: ChitsService
  ) {
    this.addChit = this.formBuilder.group({
      name: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z -_]{1,18}$")]
      ],
      amount: ["", [Validators.required, Validators.pattern("^[0-9]{1,7}$")]],
      chitType: ["Monthly", [Validators.required]],
      tenure: ["", [Validators.required, Validators.pattern("^[0-9]{1,2}$")]],
      chitDate: ["", [Validators.required]],
      membersSize: [
        "20",
        [Validators.required, Validators.pattern("^[0-9]{1,2}$")]
      ],
      createDate: [new Date().toISOString().slice(0, 10)],
      createdBy: ["5e9c17036bf4e37664eba7a6"]
    });
  }

  ngOnInit() {}
  loader: any;
  async loadingFunction(loadmsg) {
    this.loader = await this.loadingController.create({
      message: loadmsg,
      spinner: "lines"
    });
    await this.loader.present();
  }

  async loaderDismiss() {
    this.loader = await this.loadingController.dismiss();
  }
  back() {
    this.router.navigate(["/chits"]);
  }

  addChitMethod() {
    this.loadingFunction("Please Wait..");
    this.chitsService.postChitti(this.addChit.value).subscribe(
      data => {
        this.addChit.reset();
        setTimeout(() => {
          this.loaderDismiss();
        }, 1000);
        this.storage.set("chitSharedMessage", 'Chit Added Successfully');
        this.router.navigate(["/chits"]);
      },
      error => {
        console.log(error);
      }
    );
  }
  amountChange(){
    console.log('amount');
  }
}
