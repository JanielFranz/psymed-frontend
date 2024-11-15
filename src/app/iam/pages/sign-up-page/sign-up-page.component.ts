import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  templateUrl: './sign-up-page.component.html',
  imports: [
    RegisterFormComponent,
    NgIf
  ],
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {



}
