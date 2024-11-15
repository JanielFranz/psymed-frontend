import { Component } from '@angular/core';
import {ForgetPasswordFormComponent} from "../../components/forget-password-form/forget-password-form.component";
import {SignUpFormComponent} from "../../components/sign-up-form/sign-up-form.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-authentication',
  standalone: true,
  templateUrl: './authentication.component.html',
  imports: [
    ForgetPasswordFormComponent,
    SignUpFormComponent,
    NgIf
  ],
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  isForgetPassword = false; // Controls which form is displayed

  // Handle Forgot Password button click
  showForgotPasswordForm() {
    this.isForgetPassword = true;
  }

  // Handle Back to Sign Up button click
  showSignUpForm() {
    this.isForgetPassword = false;
  }
}
