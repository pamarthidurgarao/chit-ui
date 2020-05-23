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
    this.storage.get('loggedUser').then(resp => {
      this.user = JSON.parse(resp);
    });
    if (this.mode === 'Add') {

    } else {
      this.chitId = this.route.snapshot.queryParamMap.get('chitId');
      this.getChit();
    }
    this.initForm();
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

  chitAction() {
    if (this.mode === 'Edit') {
      this.chit.name = this.addChit.get('name').value;
      this.chit.chitType = this.addChit.get('chitType').value;
      this.chit.tenure = this.addChit.get('tenure').value;
      this.chit.chitDate = this.addChit.get('chitDate').value;
      this.chit.membersSize = this.addChit.get('membersSize').value;
      this.chit.createdBy = this.addChit.get('createdBy').value;
      this.chit.createdBy = this.chit.createdBy ? this.chit.createdBy : this.user._id;
      this.chit.members = [];
      this.chit.id = this.chit._id;
      this.chitsService.updateChit(this.chit).subscribe(resp => {
        this.addChit.reset();
        this.router.navigate(["/chits"]);
      });

    } else {
      this.loadingFunction("Please Wait..");
      let chit = this.addChit.value;
      chit.createdBy = this.user._id;
      chit.createDate = new Date();
      this.chitsService.postChitti(chit).subscribe(
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
          this.loaderDismiss();
          console.log(error);
        }
      );
    }
  }
  amountChange() {
  }
}
