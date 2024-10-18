import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../../services/account.service';
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
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { Account } from "../../models/account.entity";
import {TranslateModule} from "@ngx-translate/core";

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
   * Fetches role ID and loads the respective account and information.
   *
   * #region ngOnInit
   */
  ngOnInit(): void {
    // Fetch role from the store and load data based on role
    this.store.select(selectRolId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (roleId) => {
        this.role = roleId;
        if (roleId === '1') {
          this.loadProfessionalData();
        } else if (roleId === '2') {
          this.loadPatientData();
        } else {
          console.error('Invalid role');
        }
      },
      error: (error) => {
        console.error('Error fetching role ID:', error);
      }
    });
  }
  // #endregion ngOnInit

  /**
   * Load professional account and data.
   *
   * #region loadProfessionalData
   */
  loadProfessionalData(): void {
    // Fetch the first professional's account by role (1: Professional)
    this.accountService.getAccountsByRole(1).subscribe({
      next: (accounts: Account[]) => {
        if (accounts.length > 0) {
          const firstProfessionalAccount = accounts[0];
          this.loadAccount(firstProfessionalAccount.id); // Load the first professional account
        }
      },
      error: (error) => {
        console.error('Error fetching professional accounts:', error);
      }
    });

    // Fetch the first professional from the professionals array
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
  // #endregion loadProfessionalData

  /**
   * Load patient account and data.
   *
   * #region loadPatientData
   */
  loadPatientData(): void {
    // Fetch the first patient's account by role (2: Patient)
    this.accountService.getAccountsByRole(2).subscribe({
      next: (accounts: Account[]) => {
        if (accounts.length > 0) {
          const firstPatientAccount = accounts[0];
          this.loadAccount(firstPatientAccount.id); // Load the first patient account
        }
      },
      error: (error) => {
        console.error('Error fetching patient accounts:', error);
      }
    });

    // Fetch the first patient from the patients array
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
  // #endregion loadPatientData

  /**
   * Load the account details by account ID.
   *
   * #region loadAccount
   * @param accountId - The ID of the account to load.
   */
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
  // #endregion loadAccount

  /**
   * ngOnDestroy lifecycle hook - Cleans up subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.destroy$.next(true); // Emit destroy signal
    this.destroy$.unsubscribe(); // Unsubscribe from observables
  }
}
