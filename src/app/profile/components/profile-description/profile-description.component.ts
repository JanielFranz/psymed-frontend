import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfessionalService } from '../../../shared/services/professional.service';
import { PatientService } from '../../../shared/services/patient.service';
import { ProfessionalEntity } from '../../../shared/model/professional.entity';
import { Patient } from '../../../shared/model/patient.entity';
import { ActivatedRoute } from '@angular/router';
import { map, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectRolId } from "../../../store/auth/auth.selectors";
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { ProfessionalProfileEntity } from "../../../shared/model/professional-profile.entity";

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
  isProfessional: boolean = false;
  isPatient: boolean = false;
  isLoading: boolean = true;
  role: string | null = null;
  private destroy$ = new Subject<boolean>();

  constructor(
    private professionalService: ProfessionalService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectRolId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (roleId: string | null) => {
        if (roleId) {
          this.role = roleId;
          this.initializeData();
        } else {
          console.error('Role ID is null');
        }
      },
      error: (error) => console.error('Error fetching role ID:', error)
    });
  }

  private initializeData(): void {
    const entityId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('authToken');
    console.log('Extracted ID:', entityId);
    console.log('Auth Token:', token);

    if (!entityId || !token) {
      console.error('Entity ID or token is missing.');
      this.isLoading = false;
      return;
    }

    if (this.role === 'ROLE_PROFESSIONAL') {
      this.isProfessional = true;
      this.fetchProfessionalData(Number(entityId), token);
    } else if (this.role === 'ROLE_PATIENT') {
      this.isPatient = true;
      //this.fetchPatientData(Number(entityId), token);
    } else {
      console.error('Invalid role.');
      this.isLoading = false;
    }
  }
  private fetchProfessionalData(professionalId: number, token: string): void {
    this.professionalService.getProfessionalByProfileId(professionalId, token).pipe(
      takeUntil(this.destroy$),
      map((profile: ProfessionalProfileEntity) => ({
        id: profile.id,
        name: profile.fullName, // Use `fullName` from the endpoint
        email: profile.email || '', // Provide default values if necessary
        lastName: '', // Optional if not provided by the endpoint
      } as ProfessionalEntity)) // Explicitly cast to `ProfessionalEntity`
    ).subscribe({
      next: (professional: ProfessionalEntity) => {
        this.professional = professional;
      },
      error: (error) => {
        console.error('Error fetching professional data:', error);
        this.professional = undefined;
      }
    });
  }



  /*private fetchPatientData(patientId: number, token: string): void {
    this.patientService.getById(patientId).pipe(
      takeUntil(this.destroy$),
      map((patient: Patient) => ({
        id: patient.id,
        name: patient.name,
        lastName: patient.lastName,
      }))
    ).subscribe({
      next: (patient: Patient) => {
        this.patient = patient;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
        this.patient = undefined;
        this.isLoading = false;
      }
    });
  }
*/
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
