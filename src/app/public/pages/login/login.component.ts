import { Component } from '@angular/core';
import { MatButtonModule, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { setPatientId, setRole } from '../../../store/auth/auth.actions';
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule, // Ensure MatButtonModule is included for buttons
    MatIconButton,
    MatIcon,
    MatCardContent,
    MatCard,
    MatCardTitle
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private store: Store) {}

  /**
   * Dispatches professional role data to the store.
   * @param {string} rolid - The role ID to set in the store.
   */
  sendProfessionalDataToStore(rolid: string ): void {
    console.log(rolid);
    this.store.dispatch(setRole({ rolid }));
  }

  /**
   * Dispatches patient role and patient ID to the store.
   * @param {string} rolid - The role ID to set in the store.
   * @param {number} patientId - The patient ID to set in the store.
   */
  sendPatientDataToStore(rolid: string, patientId: number): void {
    console.log(rolid);
    console.log(patientId);

    this.store.dispatch(setRole({ rolid }));
    this.store.dispatch(setPatientId({ patientId }));
  }
}
