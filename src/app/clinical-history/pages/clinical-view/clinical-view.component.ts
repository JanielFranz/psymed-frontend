import { Component } from '@angular/core';
import {ClinicalInformationComponent} from "../../components/clinical-information/clinical-information.component";

@Component({
  selector: 'app-clinical-view',
  standalone: true,
  imports: [
    ClinicalInformationComponent
  ],
  templateUrl: './clinical-view.component.html',
  styleUrl: './clinical-view.component.css'
})
export class ClinicalViewComponent {

}
