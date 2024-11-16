import { Component } from '@angular/core';
import { ForgetPasswordFormComponent } from "../../components/forget-password-form/forget-password-form.component";
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { RegisterFormComponent } from "../../components/register-form/register-form.component";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-authentication',
  standalone: true,
  templateUrl: './authentication.component.html',
  imports: [
    ForgetPasswordFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    NgIf
  ],
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  activeForm: string = 'login'; // Controls which form is displayed

  // Switch to Forgot Password form
  showForgotPasswordForm() {
    this.activeForm = 'forgotPassword';
  }

  // Switch to Register form
  showRegisterForm() {
    this.activeForm = 'register';
  }

  // Switch back to Login form
  showLoginForm() {
    this.activeForm = 'login';
  }
}
