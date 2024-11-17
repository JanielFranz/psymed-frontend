import { Component } from '@angular/core';
import {RegisterFormComponent} from "../../components/register-form/register-form.component";

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {

}
