import { Component } from '@angular/core';
import {DiagnosticEditComponent} from "../../components/diagnostic-edit/diagnostic-edit.component";

@Component({
  selector: 'app-diagnostic-edit-view',
  standalone: true,
  imports: [DiagnosticEditComponent],
  templateUrl: './diagnostic-edit-view.component.html',
  styleUrl: './diagnostic-edit-view.component.css'
})
export class DiagnosticEditViewComponent {

}
