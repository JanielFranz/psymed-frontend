import { Component } from '@angular/core';
import { MedicationFormComponent} from "../../modules/medication-form/medication-form.component";
import { MedicationListComponent} from "../../modules/medication-list/medication-list.component";

@Component({
  selector: 'app-medication-management',
  standalone: true,
  imports: [MedicationFormComponent, MedicationListComponent],
  templateUrl: './medication-management.component.html',
  styleUrl: './medication-management.component.css'
})
export class MedicationManagementComponent {

}

