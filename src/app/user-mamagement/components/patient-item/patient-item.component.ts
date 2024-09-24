import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Patient} from "../../../shared/model/patient.entity";
import {MatListItem, MatListItemAvatar, MatListItemLine} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-patient-item',
  standalone: true,
  imports: [
    MatListItem,
    MatListItemAvatar,
    MatIcon,
    MatIconButton,
    MatListItemLine
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
