import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  ProfileAccountInformationComponent
} from "../../components/profile-account-information/profile-account-information.component";
import {ProfileDescriptionComponent} from "../../components/profile-description/profile-description.component";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-account-profile',
  standalone: true,
  imports: [
    MatButton,
    ProfileAccountInformationComponent,
    ProfileDescriptionComponent,
    TranslateModule
  ],
  templateUrl: './account-profile.component.html',
  styleUrl: './account-profile.component.css'
})
export class AccountProfileComponent {

  /**
   * Constructor for PatientProfileComponent.
   * @param router - Router used to navigate between pages.
   */
  constructor(private router: Router) {}

  /**
   * #region onEditProfile
   * Method to handle Edit Profile button click.
   * Navigates to the edit profile page.
   */
  onEditProfile(): void {
    this.router.navigate(['/edit-profile']); // Navigates to the edit profile URL
  }
  // #endregion onEditProfile
}
