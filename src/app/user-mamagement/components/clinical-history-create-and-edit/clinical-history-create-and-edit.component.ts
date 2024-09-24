import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-clinical-history-create-and-edit',
  standalone: true,
  imports: [
    MatFormField,
    MatInput
  ],
  templateUrl: './clinical-history-create-and-edit.component.html',
  styleUrl: './clinical-history-create-and-edit.component.css'
})
export class ClinicalHistoryCreateAndEditComponent {

}
