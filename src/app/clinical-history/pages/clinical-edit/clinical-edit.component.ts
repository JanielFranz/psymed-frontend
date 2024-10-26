import { Component } from '@angular/core';
import {ClinicalEditInformationComponent} from "../../components/clinical-edit-information/clinical-edit-information.component";

@Component({
  selector: 'app-clinical-edit',
  standalone: true,
  imports: [ ClinicalEditInformationComponent],
  templateUrl: './clinical-edit.component.html',
  styleUrl: './clinical-edit.component.css'
})
export class ClinicalEditComponent {

}
