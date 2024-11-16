import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { SignInRequest } from "../../models/sign-in.request";
import { AuthenticationService } from "../../services/authentication.service";
import { ActivatedRoute, Router } from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
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
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Output() forgotPasswordClicked = new EventEmitter<void>(); // Notify parent when Forgot Password is clicked
  @Output() registerClicked = new EventEmitter<void>(); // Emit register click event
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  role: string = ''; // Role selected during signup

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService // Inject TranslateService
  ) {}

  ngOnInit(): void {
    // Retrieve the role from query parameters
    this.route.queryParams.subscribe(params => {
      this.role = params['role'] || ''; // Default to an empty string if not provided
      localStorage.setItem('role', this.role); // Store the role locally
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;
      const signInRequest = new SignInRequest(username, password);

      this.authenticationService.signIn(signInRequest).subscribe({
        next: (response) => {
          const storedRole = localStorage.getItem('role'); // Retrieve stored role
          const accountRole = response.role; // Role returned from the backend

          if (storedRole && storedRole !== accountRole) {
            // Fetch i18n text for role mismatch with dynamic placeholders
            this.translate.get('sign-up.alert.roleMismatch', { storedRole, accountRole }).subscribe((translatedText) => {
              alert(translatedText); // Show translated alert
            });
            return;
          }

          // Store session data and navigate to home
          this.authenticationService.storeSessionData(response);
          this.router.navigate(['home']);
        },
        error: (error: any) => {
          // Fetch i18n text for sign-in failure
          this.translate.get('sign-up.alert.signInFailed').subscribe((translatedText) => {
            alert(translatedText); // Show translated alert
          });
          console.error('Sign-in failed:', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
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
    this.forgotPasswordClicked.emit(); // Notify parent
  }

  onRegisterClick() {
    this.registerClicked.emit(); // Notify parent
  }

}
