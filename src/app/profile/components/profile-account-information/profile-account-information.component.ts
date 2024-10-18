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

    // Check the URL to determine if it's a professional or patient profile
    const currentUrl = this.router.url;
    if (currentUrl.includes('professional/profile')) {
      this.isProfessional = true;
      this.loadProfessionalData(); // Load professional data
    } else if (currentUrl.includes('patient/profile')) {
      this.isPatient = true;
      this.loadPatientData(); // Load patient data
    } else {
      console.error('Invalid URL - Unable to determine if professional or patient');
    }
  }

  loadProfessionalData(): void {
    this.accountService.getAccountsByRole(1).subscribe({
      next: (accounts: Account[]) => {
        if (accounts.length > 0) {
          this.loadAccount(accounts[0].id); // Load the first professional account
        }
      },
      error: (error) => {
        console.error('Error fetching professional accounts:', error);
      }
    });

    this.professionalService.getAll().subscribe({
      next: (professionals: ProfessionalEntity[]) => {
        if (professionals.length > 0) {
          this.professional = professionals[0]; // Select the first professional
        } else {
          console.error('No professionals found.');
        }
      },
      error: (error) => {
        console.error('Error fetching professional data:', error);
      }
    });
  }

  loadPatientData(): void {
    this.accountService.getAccountsByRole(2).subscribe({
      next: (accounts: Account[]) => {
        if (accounts.length > 0) {
          this.loadAccount(accounts[0].id); // Load the first patient account
        }
      },
      error: (error) => {
        console.error('Error fetching patient accounts:', error);
      }
    });

    this.patientService.getAll().subscribe({
      next: (patients: Patient[]) => {
        if (patients.length > 0) {
          this.patient = patients[0]; // Select the first patient
        } else {
          console.error('No patients found.');
        }
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
      }
    });
  }

  loadAccount(accountId: number): void {
    this.accountService.getAccountById(accountId).subscribe({
      next: (account: Account) => {
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
