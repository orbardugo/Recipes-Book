import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  onSignup(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    this.authService.signUpUser(email, password);
  }

  private initForm() {
    let email = '';
    let password = '';
    this.signupForm = new FormGroup({
      'email': new FormControl(email, Validators.email),
      'password': new FormControl(password, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)])
    })
  }

}
