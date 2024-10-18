import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfessionalService } from '../../../shared/services/professional.service';
import { PatientService } from '../../../shared/services/patient.service';
import { ProfessionalEntity } from '../../../shared/model/professional.entity';
import { Patient } from '../../../shared/model/patient.entity';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectRolId, selectProfessionalId, selectPatientId } from "../../../store/auth/auth.selectors"; // Import selectors
import { AuthState } from '../../../store/auth/auth.state';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-profile-description',
  templateUrl: './profile-description.component.html',
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    MatCardModule,
    MatCardContent,
    MatCardHeader,
    MatCardTitle
  ],
  styleUrls: ['./profile-description.component.css']
})
export class ProfileDescriptionComponent implements OnInit, OnDestroy {
  professional: ProfessionalEntity | undefined;
  patient: Patient | undefined;
  role: string | null = null; // Role to determine whether to load professional or patient data
  isLoading: boolean = true; // Show a loader while fetching data
  private destroy$ = new Subject<boolean>(); // To handle unsubscription

  /**
   * Constructor for ProfileDescriptionComponent.
   * @param professionalService - Service used to fetch professional details.
   * @param patientService - Service used to fetch patient details.
   * @param store - Store to select role ID from state.
   */
  constructor(
    private professionalService: ProfessionalService,
    private patientService: PatientService,
    private store: Store<AuthState>
  ) {}

  /**
   * OnInit lifecycle hook to initialize the component.
   * Fetches the role ID from the store and loads either professional or patient data based on the role.
   */
  ngOnInit(): void {
    this.store.select(selectRolId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (roleId) => {
        this.role = roleId;
        if (roleId === '1') {
          this.store.select(selectProfessionalId).pipe(
            takeUntil(this.destroy$)
          ).subscribe(professionalId => {
            this.fetchProfessionalData(professionalId);  // Fetch professional by ID
          });
        } else if (roleId === '2') {
          this.store.select(selectPatientId).pipe(
            takeUntil(this.destroy$)
          ).subscribe(patientId => {
            this.fetchPatientData(patientId);  // Fetch patient by ID
          });
        } else {
          console.error('Invalid role');
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error fetching role ID:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Fetch professional data based on the professionalId from the store.
   * @param professionalId - The ID of the professional to fetch.
   */
  fetchProfessionalData(professionalId: number | null): void {
    if (professionalId) {
      this.professionalService.getById(professionalId).subscribe({  // Assuming getById method exists in service
        next: (professional: ProfessionalEntity) => {
          this.professional = professional;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching professional data:', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('No professional ID found');
      this.isLoading = false;
    }
  }

  /**
   * Fetch patient data based on the patientId from the store.
   * @param patientId - The ID of the patient to fetch.
   */
  fetchPatientData(patientId: number | null): void {
    if (patientId) {
      this.patientService.getById(patientId).subscribe({  // Assuming getById method exists in service
        next: (patient: Patient) => {
          this.patient = patient;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching patient data:', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('No patient ID found');
      this.isLoading = false;
    }
  }

  /**
   * ngOnDestroy lifecycle hook to clean up subscriptions.
   */
  ngOnDestroy(): void {
    this.destroy$.next(true); // Emit destroy signal
    this.destroy$.unsubscribe(); // Unsubscribe from observables
  }
}
