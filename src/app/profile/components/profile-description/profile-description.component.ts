import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfessionalService } from '../../../shared/services/professional.service';
import { PatientService } from '../../../shared/services/patient.service';
import { ProfessionalEntity } from '../../../shared/model/professional.entity';
import { Patient } from '../../../shared/model/patient.entity';
import { ActivatedRoute, Router } from '@angular/router'; // For route checking
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store'; // To get roleId from the store
import { selectRolId } from "../../../store/auth/auth.selectors"; // Assuming you have a role selector
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
  isProfessional: boolean = false; // Flag to determine if the URL is for professional
  isPatient: boolean = false; // Flag to determine if the URL is for patient
  isLoading: boolean = true; // Show a loader while fetching data
  role: string | null = null; // This stores the roleId
  private destroy$ = new Subject<boolean>(); // To handle unsubscription

  /**
   * Constructor for ProfileDescriptionComponent.
   * @param professionalService - Service used to fetch professional details.
   * @param patientService - Service used to fetch patient details.
   * @param route - Activated route to check the current route.
   * @param router - Router to navigate.
   * @param store - NgRx store to get the roleId
   */
  constructor(
    private professionalService: ProfessionalService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store // Inject store to get role
  ) {}

  /**
   * OnInit lifecycle hook to initialize the component.
   * Determines whether the current URL is for a professional or patient and loads data accordingly.
   * Also checks the user's role before showing the information.
   */
  ngOnInit(): void {
    // Fetch roleId from the store and assign to role variable
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

    const currentUrl = this.router.url; // Get the current URL

    if (currentUrl.includes('professional/profile')) {
      this.isProfessional = true;
      this.fetchProfessionalData(); // Load professional data if URL contains 'professional/profile'
    } else if (currentUrl.includes('patient/profile')) {
      this.isPatient = true;
      this.fetchPatientData(); // Load patient data if URL contains 'patient/profile'
    } else {
      console.error('Invalid URL - Unable to determine if professional or patient');
      this.isLoading = false;
    }
  }

  /**
   * Fetch professional data based on the URL.
   */
  fetchProfessionalData(): void {
    this.professionalService.getAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (professionals: ProfessionalEntity[]) => {
        if (professionals.length > 0) {
          this.professional = professionals[0]; // Assign the first professional
        } else {
          console.error('No professionals found.');
        }
        this.isLoading = false; // Stop loader
      },
      error: (error) => {
        console.error('Error fetching professional data:', error);
        this.isLoading = false; // Stop loader on error
      }
    });
  }

  /**
   * Fetch patient data based on the URL.
   */
  fetchPatientData(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.patientService.getById(Number(patientId)).pipe(takeUntil(this.destroy$)).subscribe({
        next: (patient: Patient) => {
          this.patient = patient
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching patient data:', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('Patient ID not found in URL.');
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
