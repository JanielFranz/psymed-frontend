import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ProfessionalService } from '../../../shared/services/professional.service';
import { PatientService } from '../../../shared/services/patient.service';
import { ProfessionalEntity } from '../../../shared/model/professional.entity';
import { Patient } from '../../../shared/model/patient.entity';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRolId } from "../../../store/auth/auth.selectors"; // Select roleId from store
import { AuthState } from '../../../store/auth/auth.state';
import { Profile } from "../../models/profile.entity";
import { PatientProfile } from "../../../shared/model/patient-profile.entity";
import {TranslateModule} from "@ngx-translate/core";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {ProfessionalProfile} from "../../../shared/model/professional-profile";

@Component({
  selector: 'app-profile-account-information',
  templateUrl: './profile-account-information.component.html',
  styleUrls: ['./profile-account-information.component.css'],
  imports: [
    TranslateModule,
    MatCardContent,
    NgIf,
    MatCard
  ],
  standalone: true
})
export class ProfileAccountInformationComponent implements OnInit, OnDestroy {
  account: Profile | undefined;
  professional: ProfessionalEntity | undefined;
  patient: Patient | undefined;
  role: string | null = null; // Role from the store
  isProfessional: boolean = false;
  isPatient: boolean = false;
  private destroy$ = new Subject<boolean>();

  constructor(
    private accountService: AccountService,
    private professionalService: ProfessionalService,
    private patientService: PatientService,
    private store: Store<AuthState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetch role from the store
    this.store.select(selectRolId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (roleId: string | null) => {
        if (roleId) {
          this.role = roleId;
          this.initializeData();
        } else {
          console.error('Role ID is null');
        }
      },
      error: (error) => {
        console.error('Error fetching role ID:', error);
      }
    });
  }
  private initializeData(): void {
    const entityId = this.route.snapshot.paramMap.get('id'); // Extract `id` from the URL
    const token = localStorage.getItem('authToken'); // Retrieve the token
    console.log('Extracted Professional ID:', entityId); // Add this log
    console.log('Auth Token:', token); // Add this log
    if (!entityId || !token) {
      console.error('Entity ID or token is missing.');
      return;
    }
    // Call appropriate methods based on the role
    if (this.role === 'ROLE_PROFESSIONAL') {
      this.isProfessional = true;
      this.fetchProfessionalData(Number(entityId), token);
    }
  }
  private fetchProfessionalData(professionalId: number, token: string): void {
    this.professionalService.getProfessionalByProfileId(professionalId, token).pipe(takeUntil(this.destroy$)).subscribe({
      next: (profile: ProfessionalProfile) => {
        console.log('Fetched professional profile:', profile);

        if (!profile) {
          console.error(`No professional profile found for ID: ${professionalId}`);
          this.professional = undefined;
          this.isProfessional = false; // Indicate no professional data
          return;
        }

        // Map the returned ProfessionalProfile to ProfessionalEntity
        this.professional = {
          id: professionalId, // Use the ID from the method parameter
          name: profile.fullName, // Use fullName directly from the response
          email: profile.email || 'N/A', // Default value if email is not provided
          address: `${profile.street}, ${profile.city}, ${profile.country}`, // Construct address
          dni: 'Not Available', // Placeholder for missing fields
          phone: 'Not Available',
          birthday: 'Not Available',
          FullName: profile.fullName, // Use fullName
        } as ProfessionalEntity;

        console.log('Mapped professional entity:', this.professional);
      },
      error: (error) => {
        console.error('Error fetching professional profile data:', error);
        this.professional = undefined;
      }
    });
  }


  private fetchPatientData(patientId: number, token: string): void {
    this.patientService.getById(patientId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (patient: Patient) => {
        console.log('Fetched patient:', patient);

        // Ensure idAccount exists
        if (!patient.idAccount) {
          console.error('idAccount is missing in the patient data.', patient);
          return;
        }

        // @ts-ignore
        this.patient = {
          ...patient,
          address: patient.address || 'N/A',
        };

        this.fetchAccountData(patient.idAccount, token); // Fetch associated account
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
      }
    });
  }

  private fetchAccountData(accountId: number, token: string): void {
    this.accountService.getAccountById(accountId, token).pipe(takeUntil(this.destroy$)).subscribe({
      next: (account: Profile | PatientProfile) => {
        if ('userName' in account) {
          this.account = account as Profile; // Type narrowing for Profile
        } else {
          console.error('Account type mismatch:', account);
        }
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
