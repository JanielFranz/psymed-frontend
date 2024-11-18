import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PatientProfile} from "../../../shared/model/patient-profile.entity";
import {UserManagementService} from "../../services/user-management.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
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

  closeForm(): void {
    this.dialog.closeAll();
    this.formClosed.emit();
  }

}
