import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PatientProfile } from "../../../shared/model/patient-profile.entity";
import { Observable, BehaviorSubject } from 'rxjs';
import { TranslateModule } from "@ngx-translate/core";
import {AsyncPipe, NgForOf} from "@angular/common";
import { MatCard } from "@angular/material/card";
import {PatientItemComponent} from "../patient-item/patient-item.component";
import {MatList, MatListSubheaderCssMatStyler} from "@angular/material/list";

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    PatientItemComponent,
    NgForOf,
    AsyncPipe,
    MatCard,
    MatListSubheaderCssMatStyler,
    TranslateModule,
    MatList

  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {
  private patientsSubject = new BehaviorSubject<Array<PatientProfile>>([]);
  patients$ = this.patientsSubject.asObservable();

  @Output() patientSelected = new EventEmitter<{ patient: PatientProfile, feature: string }>();

  @Input() set patients(data: Array<PatientProfile>) {
    console.log("Received patients in PatientListComponent:", data);
    if (data) {
      this.patientsSubject.next(data);
    }
  }

  onPatientSelected(feature: { patient: PatientProfile, feature: string }) {
    this.patientSelected.emit(feature);
  }
}
