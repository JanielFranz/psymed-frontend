import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PatientProfile} from "../../../shared/model/patient-profile.entity";
import {UserManagementService} from "../../services/user-management.service";
import {MatDialog} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    NgIf,
    MatError,
    MatIcon,
    MatIconButton,
    MatSuffix,
    MatInput,
    MatLabel,
    MatFormField,
    MatCardTitle,
    MatCard
  ],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css'
})
export class PatientFormComponent {

  @Output() formClosed = new EventEmitter<void>();
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private patientProfileService: UserManagementService
  ) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const newPatientProfile = new PatientProfile({
        ...this.patientForm.value,
        professionalId: Number(localStorage.getItem("profileId"))
      });

      const token = localStorage.getItem('authToken') || '';
      const professionalId = localStorage.getItem("profileId")
      console.log("token into create patient xd: ", token);
      console.log("professionalId into create patient xd: ", professionalId);

      this.patientProfileService.createPatientProfile(newPatientProfile, token).subscribe({
        next: () => {
          this.dialog.closeAll();
          this.formClosed.emit();
        },
        error: (error) => {
          console.error('Error creating patient profile:', error);
        }
      });
    }
  }
  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    const passwordInput: HTMLInputElement | null = document.querySelector('[formControlName="password"]');
    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
  }

  closeForm(): void {
    this.dialog.closeAll();
    this.formClosed.emit();
  }

}
