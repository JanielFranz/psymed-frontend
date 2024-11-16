import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
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
  @Input() role: string = 'ROLE_PROFESSIONAL'; // Role passed to the component
  @Output() backToSignUpClicked = new EventEmitter<void>();

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private translate: TranslateService // Inject TranslateService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.invalid) {
      if (this.registerForm.get('email')?.hasError('email')) {
        this.translate.get('register.alert.invalidEmail').subscribe((translatedText) => {
          alert(translatedText); // Show translated alert
        });
      }

      if (this.registerForm.get('password')?.hasError('minlength')) {
        this.translate.get('register.alert.shortPassword').subscribe((translatedText) => {
          alert(translatedText); // Show translated alert
        });
      }

      this.registerForm.markAllAsTouched(); // Highlight all errors
      return;
    }

    const registerRequest = new SignUpRequest(
      this.registerForm.value.firstName!,
      this.registerForm.value.lastName!,
      this.registerForm.value.street!,
      this.registerForm.value.city!,
      this.registerForm.value.country!,
      this.registerForm.value.email!,
      this.registerForm.value.username!,
      this.registerForm.value.password!
    );

    this.authenticationService.signUp(registerRequest).subscribe({
      next: (response) => {
        this.router.navigate(['login']); // Redirect to login on success
      },
      error: (error: any) => {
        if (error.status === 409) { // Conflict status for duplicated email or username
          this.translate.get('register.alert.duplicateAccount').subscribe((translatedText) => {
            alert(translatedText); // Show translated alert
          });
        } else {
          this.translate.get('register.alert.registerFailed').subscribe((translatedText) => {
            alert(translatedText); // Show generic registration failure alert
          });
        }
        console.error('Registration failed:', error);
      }
    });
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    const passwordInput: HTMLInputElement | null = document.querySelector('[formControlName="password"]');
    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
  }

  onBackToSignUpClick() {
    this.backToSignUpClicked.emit(); // Notify parent
  }
}
