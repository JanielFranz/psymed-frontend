import { Component } from '@angular/core';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { Router } from '@angular/router';
import {setPatientId, setProfessionalId, setRole} from '../../../store/auth/auth.actions';
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { TranslateModule } from "@ngx-translate/core";

/**
 * Login Component
 * @class LoginComponent
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatCardContent,
    MatCard,
    MatCardTitle,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Constructor injecting the store and router services
  constructor(private store: Store, private router: Router) {}

  /**
   * Sends professional data to the store and navigates to the home page.
   * @param rolId - The role ID (Professional).
   * @param professionalId
   */
  sendProfessionalDataToStore(rolId: string, professionalId: number): void {
    this.store.dispatch(setRole({ rolId }));
    this.store.dispatch(setProfessionalId({professionalId}));
    this.router.navigate(['/home']);
  }

  /**
   * Sends patient data (role and patient ID) to the store and navigates to the home page.
   * @param rolId - The role ID (Patient).
   * @param patientId - The patient ID.
   */
  sendPatientDataToStore(rolId: string, patientId: number): void {
    this.store.dispatch(setRole({ rolId }));
    this.store.dispatch(setPatientId({ patientId }));
    this.router.navigate(['/home']);
  }

  /**
   * Updates the current patient in the store.
   * @param patientId - The patient ID.
   */
  sendActualPatientToStore(patientId: number): void {
    this.store.dispatch(setPatientId({ patientId }));
  }
}
