import { Component } from '@angular/core';
import {DiagnosticFormComponent} from "../../components/diagnostic-form/diagnostic-form.component";

@Component({
  selector: 'app-professional-diagnostic-view',
  standalone: true,
  imports: [DiagnosticFormComponent],
  templateUrl: './professional-diagnostic-view.component.html',
  styleUrl: './professional-diagnostic-view.component.css'
})
export class ProfessionalDiagnosticViewComponent {

}
