import {Component} from '@angular/core';
import {MoodFormComponent} from "../../components/mood-form/mood-form.component";

@Component({
  selector: 'app-mood-statement-entry',
  standalone: true,
  imports: [MoodFormComponent],
  templateUrl: './mood-statement-entry.component.html',
  styleUrl: './mood-statement-entry.component.css'
})
export class MoodStatementEntryComponent {

}
