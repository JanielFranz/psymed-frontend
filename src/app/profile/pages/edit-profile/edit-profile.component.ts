import { Component } from '@angular/core';
import {
  EditProfileInformationComponent
} from "../../components/edit-profile-information/edit-profile-information.component";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    EditProfileInformationComponent
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

}
