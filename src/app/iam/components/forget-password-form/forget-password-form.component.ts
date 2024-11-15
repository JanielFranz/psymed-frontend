import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule} from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-forget-password-form',
  standalone: true,
  templateUrl: './forget-password-form.component.html',
  imports: [
    MatButton,
    TranslateModule,
    NgIf,
    MatError,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatFormField,
    MatCardTitle,
    MatCard
  ],
  styleUrls: ['./forget-password-form.component.css']
})
export class ForgetPasswordFormComponent implements OnInit {
  @Output() backToSignUpClicked = new EventEmitter<void>(); // Notify parent to switch to Sign Up form

  forgetPasswordForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private translate: TranslateService // Inject TranslateService
  ) {}

  ngOnInit(): void {
    this.forgetPasswordForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordsMatchValidator() }
    );
  }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      const { username, password } = this.forgetPasswordForm.value;

      this.authService.resetPassword(username!, password!).subscribe({
        next: () => {
          this.translate.get('forgot-password.alert.success').subscribe((message) => {
            alert(message); // Show success message
          });
          this.router.navigate(['authentication']);
        },
        error: (error) => {
          console.error('Password reset failed:', error);
          this.translate.get('forgot-password.alert.failure').subscribe((message) => {
            alert(message); // Show error message
          });
        },
      });
    } else {
      this.forgetPasswordForm.markAllAsTouched();
    }
  }

  private passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: boolean } | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  backToSignUp() {
    this.backToSignUpClicked.emit(); // Emit event to notify parent component
  }
}
