import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Patient } from '../../../shared/model/patient.entity';
import { PatientService } from '../../../shared/services/patient.service';
import { ClinicalHistory } from '../../models/clinical-history.entity';
import { ClinicalHistoryService } from '../../services/clinical-history.service';
import { selectProfileId } from '../../../store/auth/auth.selectors';
import { AuthState } from '../../../store/auth/auth.state';
import { take } from 'rxjs/operators';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-clinical-information-patient',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './clinical-information-patient.component.html',
  styleUrls: ['./clinical-information-patient.component.css']
})
export class ClinicalInformationPatientComponent implements OnInit {
  clinicalHistory!: ClinicalHistory;

  constructor(
    private clinicalService: ClinicalHistoryService,
    private patientService: PatientService,
    private store: Store<AuthState>
  ) {}

  ngOnInit() {
    this.store.select(selectProfileId).pipe(take(1)).subscribe(patientId => {
      if (patientId) {
        this.patientService.getById(patientId).subscribe((patient: Patient) => {
          this.clinicalService.getById(patient.idClinicalHistory).subscribe((clinical: ClinicalHistory) => {
            this.clinicalHistory = clinical;
          });
        });
      }
    });
  }
}
