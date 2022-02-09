import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/api/user.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.page.html",
  styleUrls: ["./registration.page.scss"],
})
export class RegistrationPage implements OnInit {
  regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.regForm = this.fb.group({
      firstName: [],
      lastName: [],
      email: [],
      password: [],
    });
  }

  onAddUser() {
    this.userService
      .createUser(this.regForm.value)
      .subscribe(async (resp: any) => {
        await this.storage.set("loggedUser", JSON.stringify(resp.user));
        this.router.navigate(["/home"]);
      });
  }
}
