import { Component } from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Store} from "@ngrx/store";
import {setPatientId, setRole} from '../../../store/auth/auth.actions'
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";

/**
 * Login Component
 * @class LoginComponent
 * @description
 * This component is responsible for handling the login process.
 * It has two buttons, one for the professional login and one for the patient login.
 * When the user clicks on the professional login button, it will dispatch the setRole action with the role ID.
 * When the user clicks on the patient login button, it will dispatch the setRole action with the role ID and the setPatientId action with the patient ID.
 * @method {sendProfessionalDataToStore} - Dispatches the setRole action with the role ID.
 * @method {sendPatientDataToStore} - Dispatches the setRole action with the role ID and the setPatientId action with the patient ID.
 * @property {Store} store - The store service.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatCardContent,
    MatCard,
    MatCardTitle
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // #region Attributes
  constructor(private store: Store) {}
  // #endregion

  /**
   * Send  Professional Data To Store
   * @description
   * Dispatches the setRole action with the role ID.
   * @param rolid - The role ID.{string}
   * @returns void
   */
  sendProfessionalDataToStore(rolid: string ): void {
    // Dispatch the action to send rolid to the store
    console.log(rolid)
    this.store.dispatch(setRole({ rolid }));
  }

  /**
   * Send Patient Data To Store
   * @description
   * Dispatches the setRole action with the role ID and the setPatientId action with the patient ID.
   * @param rolid - The role ID.{string}
   * @param patientId - The patient ID.{number}
   * @returns void
   */
  sendPatientDataToStore(rolid: string, patientId: number): void {
    console.log(rolid)
    console.log(patientId)

    this.store.dispatch(setRole({ rolid }));
    this.store.dispatch(setPatientId({ patientId }));
  }
}
