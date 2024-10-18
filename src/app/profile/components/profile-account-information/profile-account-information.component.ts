import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { Account } from "../../models/account.entity";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  standalone: true,
  selector: 'app-profile-account-information',
  templateUrl: './profile-account-information.component.html',
  imports: [
    NgIf,
    MatProgressSpinner,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatFormField,
    MatInput,
    TranslateModule
  ],
  styleUrls: ['./profile-account-information.component.css']
})
export class ProfileAccountInformationComponent implements OnInit, OnDestroy {
  account: Account | undefined;
  professional: ProfessionalEntity | undefined;
  patient: Patient | undefined;
  role: string | null = null; // Local role variable to store the resolved role
  private destroy$ = new Subject<boolean>(); // To handle unsubscription

  /**
   * Constructor for ProfileAccountInformationComponent.
   * @param accountService - Service used to retrieve account information.
   * @param professionalService - Service used to retrieve professional information.
   * @param patientService - Service used to retrieve patient information.
   * @param store - Store to select role ID from state.
   */
  constructor(
    private accountService: AccountService,
    private professionalService: ProfessionalService,
    private patientService: PatientService,
    private store: Store<AuthState>
  ) {}

  /**
   * OnInit lifecycle hook to initialize the component.
   * Fetches role ID and loads the respective account and information based on store values.
   */
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
            this.loadProfessionalData(professionalId);  // Fetch professional by ID
          });
        } else if (roleId === '2') {
          this.store.select(selectPatientId).pipe(
            takeUntil(this.destroy$)
          ).subscribe(patientId => {
            this.loadPatientData(patientId);  // Fetch patient by ID
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

  /**
   * Load professional account and data using professionalId from store.
   * @param professionalId - The ID of the professional to load.
   */
  loadProfessionalData(professionalId: number | null): void {
    if (professionalId) {
      // Fetch account by professionalId
      this.accountService.getAccountByProfessionalId(professionalId).subscribe({
        next: (account: Account) => {
          this.account = account; // Load the professional account
        },
        error: (error) => {
          console.error('Error fetching professional account:', error);
        }
      });

      // Fetch professional data by professionalId
      this.professionalService.getById(professionalId).subscribe({
        next: (professional: ProfessionalEntity) => {
          this.professional = professional; // Load the professional details
        },
        error: (error) => {
          console.error('Error fetching professional data:', error);
        }
      });
    } else {
      console.error('No professional ID found.');
    }
  }

  /**
   * Load patient account and data using patientId from store.
   * @param patientId - The ID of the patient to load.
   */
  loadPatientData(patientId: number | null): void {
    if (patientId) {
      // Fetch account by patientId
      this.accountService.getAccountByPatientId(patientId).subscribe({
        next: (account: Account) => {
          this.account = account; // Load the patient account
        },
        error: (error) => {
          console.error('Error fetching patient account:', error);
        }
      });

      // Fetch patient data by patientId
      this.patientService.getById(patientId).subscribe({
        next: (patient: Patient) => {
          this.patient = patient; // Load the patient details
        },
        error: (error) => {
          console.error('Error fetching patient data:', error);
        }
      });
    } else {
      console.error('No patient ID found.');
    }
  }

  /**
   * ngOnDestroy lifecycle hook - Cleans up subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.destroy$.next(true); // Emit destroy signal
    this.destroy$.unsubscribe(); // Unsubscribe from observables
  }
}
