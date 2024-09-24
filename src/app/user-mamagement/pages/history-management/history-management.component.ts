import { Component } from '@angular/core';
import { ClinicalHistoryFormComponent} from "../../modules/clinical-history-form/clinical-history-form.component";

@Component({
  selector: 'app-history-management',
  standalone: true,
  imports: [ClinicalHistoryFormComponent],
  templateUrl: './history-management.component.html',
  styleUrl: './history-management.component.css'
})
export class HistoryManagementComponent {

}
