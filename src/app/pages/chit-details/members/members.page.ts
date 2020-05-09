import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ChitsService } from "../../../api/chits.service";
import { LoadingController } from "@ionic/angular";
import { RequestsService } from 'src/app/api/requests.service';

@Component({
  selector: "app-members",
  templateUrl: "./members.page.html",
  styleUrls: ["./members.page.scss"]
})
export class MembersPage implements OnInit {
  private addMember: FormGroup;
  chitId = '';

  singleChittiDetails: any = [
    {
      members: []
    }
  ];
  constructor(
    private chitsService: ChitsService,
    private router: Router,
    private storage: Storage,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private requestsService: RequestsService
  ) {
    this.addMember = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
      ],
      mobile: [
        "",
        [Validators.required, Validators.pattern("^[7-9][0-9]{9}$")]
      ]
    });
  }
  loader: any;
  async loadingFunction(loadmsg) {
    this.loader = await this.loadingController.create({
      message: loadmsg,
      spinner: "lines"
    });
    await this.loader.present();
  }
  ngOnInit() { }
  async loaderDismiss() {
    this.loader = await this.loadingController.dismiss();
  }
  ionViewWillEnter() {
    this.storage.get("singleChitti").then(val => {
      this.chitId = val;
      this.chittiDetails(val);
    });
  }
  chittiDetails(key) {
    this.loadingFunction("Please Wait..");
    this.chitsService.getSingleChittiDetails(key).subscribe(
      data => {
        this.singleChittiDetails = data;
        setTimeout(() => {
          this.loaderDismiss();
        }, 800);
      },
      error => {
        setTimeout(() => {
          this.loadingFunction("something went wrong..!");
        }, 800);
      }
    );
  }
  addMemberSubmit(): void {
    console.log("data");
  }

  createRequest() {
    let data: any = {};
    data.chit = this.chitId;
    data.user = '';
    data.status = true;
    this.requestsService.createRequest(data).subscribe(resp => {

    });
  }
}
