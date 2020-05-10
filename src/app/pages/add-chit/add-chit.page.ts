import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
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
  addChit: FormGroup;
  mode: string = 'Add'
  loader: any;
  user: any = {};
  chit: any = {};
  chitId: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private storage: Storage,
    private chitsService: ChitsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mode = this.route.snapshot.paramMap.get('mode');
    this.chitId = this.route.snapshot.queryParamMap.get('chitId');
    this.storage.get('loggedUser').then(resp => {
      this.user = JSON.parse(resp);
    });
    this.getChit();
    if (this.mode === 'Add') {
      this.initForm();
    }
  }


  initForm() {
    this.addChit = this.formBuilder.group({
      name: [this.mode === 'Add' ? '' : this.chit.name, [Validators.required, Validators.pattern("^[a-zA-Z -_]{1,18}$")]],
      amount: [this.mode === 'Add' ? '' : this.chit.amount, [Validators.required, Validators.pattern("^[0-9]{1,7}$")]],
      chitType: [this.mode === 'Add' ? 'Monthly' : this.chit.chitType, [Validators.required]],
      tenure: [this.mode === 'Add' ? '' : this.chit.tenure, [Validators.required, Validators.pattern("^[0-9]{1,2}$")]],
      chitDate: [this.mode === 'Add' ? '' : this.chit.chitDate, [Validators.required]],
      membersSize: [this.mode === 'Add' ? '' : this.chit.membersSize, [Validators.required, Validators.pattern("^[0-9]{1,2}$")]],
      createDate: [this.mode === 'Add' ? '' : this.chit.createDate],
      createdBy: [this.user._id]
    });
  }

  getChit() {
    this.chitsService.getSingleChittiDetails(this.chitId).subscribe((data: any) => {
      this.chit = data;
      this.initForm();
    }, error => {
      console.log("error");
    }
    );
  }
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
        this.storage.set(
          "chitSharedMessage",
          "<ion-icon class='icon-message success' name='checkmark-circle-outline'></ion-icon> Chit Group Added Successfully"
        );
        this.router.navigate(["/chits"]);
      },
      error => {
        console.log(error);
      }
    );
  }
  amountChange() {
  }
}
