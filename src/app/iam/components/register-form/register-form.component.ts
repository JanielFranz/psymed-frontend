import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {SignUpRequest} from "../../models/sign-up.request";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatCard, MatCardTitle } from "@angular/material/card";

@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.component.html',
  imports: [
    TranslateModule,
    MatButton,
    NgIf,
    MatError,
    MatIcon,
    MatSuffix,
    MatIconButton,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatFormField,
    MatCardTitle,
    MatCard
  ],
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @Output() forgotPasswordClicked = new EventEmitter<void>(); // Notify parent when Forgot Password is clicked

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('ROLE_PROFESSIONAL', [Validators.required])
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private translate: TranslateService // Inject TranslateService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username!;
      const password = this.registerForm.value.password!;
      const role = this.registerForm.value.role!;
      const registerRequest = new SignUpRequest(username, password, role);

      this.authenticationService.signUp(registerRequest).subscribe({
        next: (response) => {
          // Store session data and navigate to home
          this.router.navigate(['home']);
        },
        error: (error: any) => {
          // Fetch i18n text for registration failure
          this.translate.get('register.alert.registerFailed').subscribe((translatedText) => {
            alert(translatedText); // Show translated alert
          });
          console.error('Registration failed:', error);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    const passwordInput: HTMLInputElement | null = document.querySelector('[formControlName="password"]');
    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
  }

  onForgotPasswordClick() {
    this.forgotPasswordClicked.emit(); // Emit event to parent component
  }
}
