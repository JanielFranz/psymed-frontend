import { Component } from '@angular/core';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { Router } from '@angular/router';
import {setJwtToken, setProfileId, setRole} from '../../../store/auth/auth.actions';
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { TranslateModule } from "@ngx-translate/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SignInRequest} from "../../../iam/models/sign-in.request";
import {AuthenticationService} from "../../../iam/services/authentication.service";

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
  // Constructor injecting the store and router services
  constructor(private store: Store, private router: Router, private authenticationService: AuthenticationService) {}

  /**
   * Sends professional data to the store and navigates to the home page.
   * @param rolId - The role ID (Professional).
   */
  sendProfileDataToStore(rolId: string): void {
    // Dispatch the role to store
    this.store.dispatch(setRole({ rolId }));

    // Navigate to sign-up page after setting the role
    this.router.navigate(['authentication'], { queryParams: { role: rolId } });
  }
}
