import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ProfessionalService } from '../../../shared/services/professional.service';
import { PatientService } from '../../../shared/services/patient.service';
import { ProfessionalEntity } from '../../../shared/model/professional.entity';
import { Patient } from '../../../shared/model/patient.entity';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRolId } from "../../../store/auth/auth.selectors"; // Select roleId from store
import { AuthState } from '../../../store/auth/auth.state';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { Profile } from "../../models/profile.entity";
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
  account: Profile | undefined;
  professional: ProfessionalEntity | undefined;
  patient: Patient | undefined;
  role: string | null = null; // Role will store the roleId from the store
  isProfessional: boolean = false; // Flag to check if the user is a professional
  isPatient: boolean = false; // Flag to check if the user is a patient
  private destroy$ = new Subject<boolean>(); // To handle unsubscription

  constructor(
    private accountService: AccountService,
    private professionalService: ProfessionalService,
    private patientService: PatientService,
    private store: Store<AuthState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Fetch role from the store
    this.store.select(selectRolId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (roleId: string | null) => { // Handle both string and null
        if (roleId) {
          this.role = roleId; // Store the roleId from the store
        } else {
          console.error('Role ID is null');
        }
      },
      error: (error) => {
        console.error('Error fetching role ID:', error);
      }
    });

    // Get the id parameter from the route
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params.get('id');
      if (id) {
        if (this.router.url.includes('professional/profile')) {
          this.isProfessional = true;
          this.loadProfessionalData(Number(id)); // Load specific professional data
        } else if (this.router.url.includes('patient/profile')) {
          this.isPatient = true;
          this.loadPatientData(Number(id)); // Load specific patient data
        } else {
          console.error('Invalid URL - Unable to determine if professional or patient');
        }
      } else {
        console.error('No id parameter found in URL');
      }
    });
  }

  loadProfessionalData(professionalId: number): void {
    this.professionalService.getById(professionalId).subscribe({
      next: (professional: ProfessionalEntity) => {
        this.professional = professional;
      },
      error: (error) => {
        console.error('Error fetching professional data:', error);
      }
    });
  }

  loadPatientData(patientId: number): void {
    this.patientService.getById(patientId).subscribe({
      next: (patient: Patient) => {
        this.patient = patient;
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
      }
    });
  }


  loadAccount(accountId: number): void {
    this.accountService.getAccountById(accountId).subscribe({
      next: (account: Profile) => {
        this.account = account;
      },
      error: (error) => {
        console.error('Error fetching account details:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
