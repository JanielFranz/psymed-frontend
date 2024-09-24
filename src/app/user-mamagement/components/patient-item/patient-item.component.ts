import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Patient} from "../../../shared/model/patient.entity";
import {MatListItem, MatListItemAvatar} from "@angular/material/list";

@Component({
  selector: 'app-patient-item',
  standalone: true,
  imports: [
    MatListItem,
    MatListItemAvatar
  ],
  templateUrl: './patient-item.component.html',
  styleUrl: './patient-item.component.css'
})
export class PatientItemComponent {
  @Input() patient!: Patient;
  @Output() patientSelected = new EventEmitter<Patient>

  onClick() {
    this.patientSelected.emit(this.patient);
  }

}
