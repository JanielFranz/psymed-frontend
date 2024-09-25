import { Component } from '@angular/core';
import {BiologicalFormComponent} from "../../components/biological-form/biological-form.component";

@Component({
  selector: 'app-biological-functions-entry',
  standalone: true,
  imports: [BiologicalFormComponent],
  templateUrl: './biological-functions-entry.component.html',
  styleUrl: './biological-functions-entry.component.css'
})
export class BiologicalFunctionsEntryComponent {

}
