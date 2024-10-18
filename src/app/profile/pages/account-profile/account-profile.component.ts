import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { ProfileAccountInformationComponent } from "../../components/profile-account-information/profile-account-information.component";
import { ProfileDescriptionComponent } from "../../components/profile-description/profile-description.component";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { TranslateModule } from "@ngx-translate/core";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectRolId, selectProfessionalId, selectPatientId } from "../../../store/auth/auth.selectors"; // Import selectors
import { AuthState } from '../../../store/auth/auth.state';
import { NgIf } from "@angular/common";

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
  patientId: number | null = null; // Variable to store patient ID
  private destroy$ = new Subject<boolean>(); // To handle unsubscription

  /**
   * Constructor for AccountProfileComponent.
   * @param router - Router used to navigate between pages.
   * @param store - Store to access the role ID and professional/patient ID from the auth state.
   */
  constructor(private router: Router, private store: Store<AuthState>) {}

  ngOnInit(): void {
    // Subscribe to roleId from the store
    this.store.select(selectRolId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (roleId) => {
        this.roleId = roleId; // Store the roleId for conditional navigation

        if (roleId === '1') {
          // Subscribe to professionalId from the store if role is 1
          this.store.select(selectProfessionalId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (professionalId) => {
              this.professionalId = professionalId;
            },
            error: (error) => {
              console.error('Error fetching professional ID:', error);
            }
          });
        } else if (roleId === '2') {
          // Subscribe to patientId from the store if role is 2
          this.store.select(selectPatientId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (patientId) => {
              this.patientId = patientId;
            },
            error: (error) => {
              console.error('Error fetching patient ID:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error fetching role ID:', error);
      }
    });
  }

  /**
   * Method to handle Edit Profile button click.
   * Navigates to the appropriate edit profile page based on role.
   */
  onEditProfile(): void {
    if (this.roleId === '1' && this.professionalId) {
      // Navigate to professional profile page
      this.router.navigate([`/professional/edit-profile/${this.professionalId}`]);
    } else if (this.roleId === '2' && this.patientId) {
      // Navigate to patient edit profile page
      this.router.navigate([`/patient/edit-profile/${this.patientId}`]);
    } else {
      console.error('Invalid role or missing ID for navigation.');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true); // Emit destroy signal
    this.destroy$.unsubscribe(); // Unsubscribe from observables
  }
}
