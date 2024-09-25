import { Component } from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Store} from "@ngrx/store";
import { setRole } from '../../../store/auth/auth.actions'
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
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
  constructor(private store: Store) {}

  sendRolidToStore(rolid: string ): void {
    // Dispatch the action to send rolid to the store
    console.log(rolid)
    this.store.dispatch(setRole({ rolid }));
  }
}
