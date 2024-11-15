import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { ProfileAccountInformationComponent } from "../../components/profile-account-information/profile-account-information.component";
import { ProfileDescriptionComponent } from "../../components/profile-description/profile-description.component";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from '@ngrx/store';
import { TranslateModule } from "@ngx-translate/core";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectRolId, selectProfileId } from "../../../store/auth/auth.selectors"; // Import selectors
import { AuthState } from '../../../store/auth/auth.state';
import { NgIf } from "@angular/common";
import { PatientService } from '../../../shared/services/patient.service';
import { Patient } from '../../../shared/model/patient.entity';

@Component({
  selector: 'app-account-profile',
  standalone: true,
  imports: [
    MatButton,
    ProfileAccountInformationComponent,
    ProfileDescriptionComponent,
    TranslateModule,
    NgIf
  ],
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit, OnDestroy {
  roleId: string | null = null; // Variable to store role ID
  professionalId: number | null = null; // Variable to store professional ID
  patientId: number | null = null; // Variable to store patient ID (for self or viewing another patient)
  viewedPatient: Patient | null = null; // Store the patient being viewed by a professional
  private destroy$ = new Subject<boolean>(); // To handle unsubscription

  /**
   * Constructor for AccountProfileComponent.
   * @param router - Router used to navigate between pages.
   * @param route - ActivatedRoute to access route parameters.
   * @param store - Store to access the role ID and professional/patient ID from the auth state.
   * @param patientService - Service to fetch patient details if necessary.
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AuthState>,
    private patientService: PatientService
  ) {}
  ngOnInit(): void {
    // Fetch roleId and handle logic based on the role
    this.store.select(selectRolId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (roleId) => {
        this.roleId = roleId; // Store the roleId for conditional logic
        const currentUrl = this.router.url; // Get the current URL

        if (roleId === 'ROLE_PROFESSIONA') {
          // Professional role: Check if viewing patient or professional profile
          if (currentUrl.includes('patient/profile')) {
            // Professional viewing a patient profile, fetch patient data
            const patientId = this.route.snapshot.paramMap.get('id');
            if (patientId) {
              this.fetchPatientData(Number(patientId)); // Fetch patient details
            } else {
              console.error('Patient ID is missing in the URL.');
            }
          } else if (currentUrl.includes('professional/profile')) {
            // Professional viewing their own profile, fetch professional data
            this.store.select(selectProfileId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (professionalId) => {
                this.professionalId = professionalId; // Store professionalId
              },
              error: (error) => {
                console.error('Error fetching professional ID:', error);
              }
            });
          }
        } else if (roleId === 'ROLE_PATIENT') {
          // Patient role, always fetch patient data
          const patientId = this.route.snapshot.paramMap.get('id');
          if (currentUrl.includes('patient/profile') && patientId) {
            this.fetchPatientData(Number(patientId)); // Fetch patient details
          } else if (currentUrl.includes('professional/profile')) {
            // Patient shouldn't view professional profiles
            console.warn('Patients are not allowed to view professional profiles.');
          } else {
            console.error('Patient ID is missing in the URL.');
          }
        }
      },
      error: (error) => {
        console.error('Error fetching role ID:', error);
      }
    });
  }

  /**
   * Helper method to fetch patient data.
   * @param patientId - The ID of the patient to fetch.
   */
  fetchPatientData(patientId: number): void {
    this.patientService.getById(patientId).subscribe({
      next: (patient) => {
        this.viewedPatient = patient; // Store the patient data being viewed
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
      }
    });
  }
  /**
   * Method to handle Edit Profile button click.
   * Navigates to the appropriate edit profile page based on the current route.
   */
  onEditProfile(): void {
    const currentUrl = this.router.url; // Get the current URL

    // Check if the URL contains 'professional/profile' or 'patient/profile'
    if (currentUrl.includes('professional/profile')) {
      const professionalId = this.route.snapshot.paramMap.get('id'); // Get the ID from the URL
      if (professionalId) {
        // Navigate to professional edit profile page
        this.router.navigate([`/professional/edit-profile/${professionalId}`]);
      } else {
        console.error('Professional ID is missing in the URL.');
      }
    } else if (currentUrl.includes('patient/profile')) {
      const patientId = this.route.snapshot.paramMap.get('id'); // Get the ID from the URL
      if (patientId) {
        // Navigate to patient edit profile page
        this.router.navigate([`/patient/edit-profile/${patientId}`]);
      } else {
        console.error('Patient ID is missing in the URL.');
      }
    } else {
      console.error('Unrecognized profile type in the URL.');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true); // Emit destroy signal
    this.destroy$.unsubscribe(); // Unsubscribe from observables
  }
}
