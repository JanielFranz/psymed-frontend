import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ProfessionalService } from '../../../shared/services/professional.service';
import { PatientService } from '../../../shared/services/patient.service';
import { ProfessionalEntity } from '../../../shared/model/professional.entity';
import { Patient } from '../../../shared/model/patient.entity';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from "../../models/profile.entity";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRolId } from "../../../store/auth/auth.selectors";
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
  account: Profile | undefined;
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
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store
  ) {
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
      image: [''],
      idClinicalHistory: [''] // Add idClinicalHistory
    });
  }

  ngOnInit(): void {
    this.store.select(selectRolId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (roleId: string | null) => {
        if (roleId !== null) {
          this.role = roleId;
        } else {
          console.error('Role ID is null');
        }
      },
      error: (error) => {
        console.error('Error fetching role ID:', error);
      }
    });

    const currentUrl = this.router.url;
    if (currentUrl.includes('professional/edit-profile')) {
      const professionalId = this.extractIdFromUrl(currentUrl);
      if (professionalId) {
        this.loadProfessionalData(Number(professionalId));
      } else {
        console.error('Professional ID is missing in the URL.');
      }
    } else if (currentUrl.includes('patient/edit-profile')) {
      const patientId = this.extractIdFromUrl(currentUrl);
      if (patientId) {
        this.loadPatientData(Number(patientId));
      } else {
        console.error('Patient ID is missing in the URL.');
      }
    } else {
      console.error('Invalid URL - Unable to determine profile type.');
    }
  }

  extractIdFromUrl(url: string): string | null {
    const segments = url.split('/');
    return segments.length > 2 ? segments[segments.length - 1] : null;
  }

  loadProfessionalData(professionalId: number | null): void {
    if (professionalId) {
      // @ts-ignore
      this.professionalService.getById(professionalId).subscribe({
        complete(): void {
        },
        next: (professional: ProfessionalEntity) => {
          this.professional = professional;
          this.loadAccount(professional.idAccount);
          this.editForm.patchValue({
            idAccount: professional.idAccount,
            dni: professional.dni,
            name: professional.name,
            lastName: professional.lastName,
            email: professional.email,
            phone: professional.phone,
            address: professional.address,
            birthday: professional.birthday,
            description: professional.description,
            image: professional.image
          });
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

  loadPatientData(patientId: number | null): void {
    if (patientId) {
      this.patientService.getById(patientId).subscribe({
        next: (patient: Patient) => {
          this.patient = patient;
          this.loadAccount(patient.idAccount);
          this.editForm.patchValue({
            idAccount: patient.idAccount,
            dni: patient.dni,
            name: patient.name,
            lastName: patient.lastName,
            email: patient.email,
            phone: patient.phone,
            address: patient.address,
            birthday: patient.birthday,
            description: patient.description,
            image: patient.image,
            idClinicalHistory: patient.idClinicalHistory // Only for patients
          });
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

  loadAccount(accountId: number): void {
    this.accountService.getAccountById(accountId).subscribe({
      next: (account: Profile) => {
        this.account = account;
        this.editForm.patchValue({
          idAccount: account.id,
          userName: account.userName,
          password: account.password
        });
      },
      error: (error) => {
        console.error('Error fetching account details:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedData = { ...this.editForm.value };
      delete updatedData.password;

      if (this.professional) {
        const id = this.professional.id;
        this.professionalService.update(id, updatedData).subscribe({
          next: () => {
            this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
            this.updateAccountPassword();
            this.router.navigate([`/professional/profile/${id}`]);
          },
          error: (error) => {
            console.error('Error updating profile:', error);
            this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
          }
        });
      } else if (this.patient) {
        const id = this.patient.id;
        this.patientService.update(id, updatedData).subscribe({
          next: () => {
            this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
            this.updateAccountPassword();
            this.router.navigate([`/patient/profile/${id}`]);
          },
          error: (error) => {
            console.error('Error updating profile:', error);
            this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }

  updateAccountPassword(): void {
    if (this.account) {
      const updatedAccount: Profile = {
        ...this.account,
        password: this.editForm.get('password')?.value,
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

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      this.editForm.patchValue({
        image: `assets/img/${file.name}`
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
