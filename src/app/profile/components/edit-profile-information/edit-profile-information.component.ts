import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ProfessionalService } from '../../../shared/services/professional.service';
import { PatientService } from '../../../shared/services/patient.service';
import { ProfessionalEntity } from '../../../shared/model/professional.entity';
import { Patient } from '../../../shared/model/patient.entity';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectRolId, selectProfessionalId, selectPatientId } from "../../../store/auth/auth.selectors";
import { AuthState } from '../../../store/auth/auth.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from "../../models/account.entity";
import { Router } from '@angular/router';
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { NgIf } from "@angular/common";
import { MatInput } from "@angular/material/input";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  standalone: true,
  selector: 'app-edit-profile-information',
  templateUrl: './edit-profile-information.component.html',
  styleUrls: ['./edit-profile-information.component.css'],
  imports: [ReactiveFormsModule, MatLabel, MatError, NgIf, MatFormField, MatInput, MatCardContent, MatCard, MatButton, TranslateModule]
})
export class EditProfileInformationComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  account: Account | undefined;
  professional: ProfessionalEntity | undefined;
  patient: Patient | undefined;
  role: string | null = null;
  private destroy$ = new Subject<boolean>();
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private professionalService: ProfessionalService,
    private patientService: PatientService,
    private store: Store<AuthState>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // Initialize the form with empty controls
    this.editForm = this.fb.group({
      idAccount: ['', Validators.required],
      dni: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      phone: [''],
      address: [''],
      birthday: ['', Validators.required],
      description: [''],
      password: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit(): void {
    // Fetch role from the store and load data based on role
    this.store.select(selectRolId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (roleId) => {
        this.role = roleId;
        if (roleId === '1') {
          this.store.select(selectProfessionalId).pipe(
            takeUntil(this.destroy$)
          ).subscribe(professionalId => {
            this.loadProfessionalData(professionalId);
          });
        } else if (roleId === '2') {
          this.store.select(selectPatientId).pipe(
            takeUntil(this.destroy$)
          ).subscribe(patientId => {
            this.loadPatientData(patientId);
          });
        } else {
          console.error('Invalid role');
        }
      },
      error: (error) => {
        console.error('Error fetching role ID:', error);
      }
    });
  }

  // Load professional data based on professionalId from the store
  loadProfessionalData(professionalId: number | null): void {
    if (professionalId) {
      this.professionalService.getById(professionalId).subscribe({
        next: (professional: ProfessionalEntity) => {
          this.professional = professional;
          this.loadAccount(professional.idAccount); // Load Account details separately
          this.editForm.patchValue({
            idAccount: professional.idAccount,
            dni: professional.dni,
            name: professional.name,
            lastName: professional.lastName,
            email: professional.email,  // Patch the email here
            phone: professional.phone,
            address: professional.address,
            birthday: professional.birthday,
            description: professional.description,
            image: professional.image
          });

          // Set the imagePreview to the image from the database
          this.imagePreview = professional.image;
        },
        error: (error) => {
          console.error('Error fetching professional data.', error);
        }
      });
    } else {
      console.error('No professional ID found.');
    }
  }

  // Load patient data based on patientId from the store
  loadPatientData(patientId: number | null): void {
    if (patientId) {
      this.patientService.getById(patientId).subscribe({
        next: (patient: Patient) => {
          this.patient = patient;
          this.loadAccount(patient.idAccount); // Load Account details separately
          this.editForm.patchValue({
            idAccount: patient.idAccount,
            dni: patient.dni,
            name: patient.name,
            lastName: patient.lastName,
            email: patient.email,  // Patch the email here
            phone: patient.phone,
            address: patient.address,
            birthday: patient.birthday,
            description: patient.description,
            image: patient.image
          });

          // Set the imagePreview to the image from the database
          this.imagePreview = patient.image;
        },
        error: (error) => {
          console.error('Error fetching patient data.', error);
        }
      });
    } else {
      console.error('No patient ID found.');
    }
  }

  // Load account information and set userName and password
  loadAccount(accountId: number): void {
    this.accountService.getAccountById(accountId).subscribe({
      next: (account: Account) => {
        this.account = account;
        // Set account data (userName and password)
        this.editForm.patchValue({
          idAccount: account.id,
          userName: account.userName,  // Set the userName
          password: account.password,  // Set the password
        });
      },
      error: (error) => {
        console.error('Error fetching account details:', error);
      }
    });
  }

  // Handle the form submission
  // Handle the form submission
  onSubmit(): void {
    if (this.editForm.valid) {
      // Create a shallow copy of the form data, excluding the password
      const updatedData = { ...this.editForm.value };
      delete updatedData.password; // Exclude password from the profile update

      // Handle the professional or patient entity update
      if (this.role === '1' && this.professional) {
        const id = this.professional.id;
        this.professionalService.update(id, updatedData).subscribe({
          next: () => {
            this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
            this.updateAccountPassword(); // Update the account password separately
            this.router.navigate([`/professional/profile/${id}`]); // Navigate to the professional profile with their ID
          },
          error: (error) => {
            console.error('Error updating profile:', error);
            this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
          }
        });
      } else if (this.role === '2' && this.patient) {
        const id = this.patient.id;
        this.patientService.update(id, updatedData).subscribe({
          next: () => {
            this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
            this.updateAccountPassword(); // Update the account password separately
            this.router.navigate([`/patient/profile/${id}`]); // Navigate to the patient profile with their ID
          },
          error: (error) => {
            console.error('Error updating profile:', error);
            this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }

  // Update the password in the Account entity
  updateAccountPassword(): void {
    if (this.account) {
      const updatedAccount: Account = {
        ...this.account, // Spread the existing account fields
        password: this.editForm.get('password')?.value // Set the new password from the form
        ,
        isProfessional: function (): boolean {
          throw new Error('Function not implemented.');
        },
        isPatient: function (): boolean {
          throw new Error('Function not implemented.');
        },
        getUserName: function (): string {
          throw new Error('Function not implemented.');
        },
        changePassword: function (newPassword: string): void {
          throw new Error('Function not implemented.');
        },
        validatePassword: function (password: string): boolean {
          throw new Error('Function not implemented.');
        }
      };

      this.accountService.update(updatedAccount.id, updatedAccount).subscribe({
        next: () => {
          this.snackBar.open('Password updated successfully!', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error updating account password:', error);
          this.snackBar.open('Error updating password', 'Close', { duration: 3000 });
        }
      });
    }
  }

  // Handle file selection for image upload
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();

      // Load the selected file and set the image preview
      reader.onload = () => {
        this.imagePreview = reader.result; // Update the image preview with the selected file's data URL
      };

      reader.readAsDataURL(file); // Read the file as a data URL to show the preview

      // Simulate saving to 'assets/img' by storing the file name in the form control
      this.editForm.patchValue({
        image: `assets/img/${file.name}` // Set the file path as if saved to assets/img
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
