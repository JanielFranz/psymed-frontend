import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from "@angular/material/toolbar";
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";
import { MatIcon } from "@angular/material/icon";
import { ToolbarComponent } from "./public/components/toolbar/toolbar.component";
import {
  AppointmentFormComponent
} from "./appointment-and-administration/components/appointment-form/appointment-form.component";
import { TranslateService } from "@ngx-translate/core";
import { Store } from '@ngrx/store';
import {setJwtToken, setProfileId, setRole} from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbar,
    MatAnchor,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    ToolbarComponent,
    AppointmentFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'psymed-frontend';

  constructor(private translate: TranslateService, private store: Store) {
    // Initialize translations
    translate.setDefaultLang('en');
    translate.use('en');

    // Check for persisted token and dispatch to the store
    this.initializeAuthToken();
  }

  private initializeAuthToken(): void {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');
    const profileId = localStorage.getItem('profileId');

    console.log('Retrieved from localStorage:', { token, role, profileId }); // Debugging

    if (token) {
      this.store.dispatch(setJwtToken({ jwtToken: token }));
      console.log('Token dispatched to the store:', token); // Debugging
    }

    if (role) {
      this.store.dispatch(setRole({ rolId: role }));
      console.log('Role dispatched to the store:', role); // Debugging
    }

    if (profileId) {
      this.store.dispatch(setProfileId({ profileId: Number(profileId) }));
      console.log('Profile ID dispatched to the store:', profileId); // Debugging
    }
  }


}
