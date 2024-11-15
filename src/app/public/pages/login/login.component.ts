import { Component } from '@angular/core';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { Router } from '@angular/router';
import {setJwtToken, setProfileId, setRole} from '../../../store/auth/auth.actions';
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { TranslateModule } from "@ngx-translate/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignInRequest} from "../../models/sign-in.request";

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
    TranslateModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  // Constructor injecting the store and router services
  constructor(private store: Store, private router: Router, private authenticationService: AuthenticationService) {}

  /**
   * Sends professional data to the store and navigates to the home page.
   * @param rolId - The role ID (Professional).
   * @param profileId
   * @param jwtToken
   */
  sendProfileDataToStore(rolId: string, profileId: number, jwtToken: string): void {
    this.store.dispatch(setRole({ rolId }));
    this.store.dispatch(setProfileId({profileId}));
    this.store.dispatch(setJwtToken({ jwtToken }))
    this.router.navigate(['/home']);
  }

  /**
   * Sends patient data (role and patient ID) to the store and navigates to the home page.
   * @param rolId - The role ID (Patient).
   * @param patientId - The patient ID.
   */
  // sendPatientDataToStore(rolId: string, patientId: number): void {
  //   this.store.dispatch(setRole({ rolId }));
  //   this.store.dispatch(setPatientId({ patientId }));
  //   this.router.navigate(['/home']);
  // }

  /**
   * Updates the current patient in the store.
   * @param patientId - The patient ID.
   */
  // sendActualPatientToStore(patientId: number): void {
  //   this.store.dispatch(setPatientId({ patientId }));
  // }
  onSubmit() {

    let username = this.loginForm.value.username!.toString();
    let password = this.loginForm.value.password!.toString();
    const signInRequest = new SignInRequest(username, password);
    this.authenticationService.signIn(signInRequest);
    this.router.navigate(['/home']);
  }
}
