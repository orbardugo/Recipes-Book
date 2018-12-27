import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  signinForm: FormGroup;
  private  subscription: Subscription;
  errorMsg = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
    this.subscription = this.authService.errorMsgChanged.subscribe(
      (error: string) => this.errorMsg = error
    );
  }

  private initForm() {
    let email = '';
    let password = '';
    this.signinForm = new FormGroup({
      'email': new FormControl(email, Validators.email),
      'password': new FormControl(password, [Validators.required])
    })
  }

  checkError() {

    if (this.errorMsg != '')
      return true;
    return false;
  }

  onSignin(f: NgForm) {
    this.errorMsg = '';
    const email = f.value.email;
    const password = f.value.password;
    this.authService.signInUser(email, password);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
