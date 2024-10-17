import {Component, Input} from '@angular/core';
import {BiologicalFunctions} from "../../models/biological-functions.entity";

@Component({
  selector: 'app-biological-card',
  standalone: true,
  imports: [],
  templateUrl: './biological-card.component.html',
  styleUrl: './biological-card.component.css'
})
export class BiologicalCardComponent {

  @Input() biologicalFunctions!: BiologicalFunctions;

}
