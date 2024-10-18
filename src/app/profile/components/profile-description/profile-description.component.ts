import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfessionalService } from '../../../shared/services/professional.service';
import { PatientService } from '../../../shared/services/patient.service';
import { ProfessionalEntity } from '../../../shared/model/professional.entity';
import { Patient } from '../../../shared/model/patient.entity';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectRolId } from "../../../store/auth/auth.selectors";
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
   *
   * #region ngOnInit
   */
  ngOnInit(): void {
    this.store.select(selectRolId).pipe(
        takeUntil(this.destroy$)
    ).subscribe({
      next: (roleId) => {
        this.role = roleId;
        if (roleId === '1') {
          this.fetchProfessionalData();
        } else if (roleId === '2') {
          this.fetchPatientData();
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
  // #endregion ngOnInit

  /**
   * Fetch professional data based on the role.
   */
  fetchProfessionalData(): void {
    this.professionalService.getAll().subscribe({
      next: (professionals: ProfessionalEntity[]) => {
        if (professionals.length > 0) {
          this.professional = professionals[0]; // Assign the first professional
        } else {
          console.error('No professionals found.');
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching professional data:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Fetch patient data based on the role.
   */
  fetchPatientData(): void {
    this.patientService.getAll().subscribe({
      next: (patients: Patient[]) => {
        if (patients.length > 0) {
          this.patient = patients[0]; // Assign the first patient
        } else {
          console.error('No patients found.');
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * ngOnDestroy lifecycle hook to clean up subscriptions.
   */
  ngOnDestroy(): void {
    this.destroy$.next(true); // Emit destroy signal
    this.destroy$.unsubscribe(); // Unsubscribe from observables
  }
}
