import {Component, EventEmitter, Input, Output} from '@angular/core';

import {MatListItem, MatListItemAvatar, MatListItemLine} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {PatientProfile} from "../../../shared/model/patient-profile.entity";

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
  @Input() patient!: PatientProfile;
  @Output() patientSelected = new EventEmitter<{patient: PatientProfile, feature: string}>();

  onGoToFeature(feature: string) {
    this.patientSelected.emit({patient: this.patient, feature: feature});
  }

}
