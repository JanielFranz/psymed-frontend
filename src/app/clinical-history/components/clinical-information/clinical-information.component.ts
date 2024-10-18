import {Component, Input, OnInit} from '@angular/core';
import { ClinicalHistoryService } from '../../services/clinical-history.service';
import {ClinicalHistory} from "../../models/clinical-history.entity";
import {ActivatedRoute} from "@angular/router";
import {Patient} from "../../../shared/model/patient.entity";
import {PatientService} from "../../../shared/services/patient.service";

@Component({
  selector: 'app-clinical-information',
  standalone: true,
  imports: [],
  templateUrl: './clinical-information.component.html',
  styleUrl: './clinical-information.component.css'
})
export class ClinicalInformationComponent implements OnInit{

  @Input() clinicalHistory !: ClinicalHistory;
  @Input() patient !: Patient;

  constructor(
    private clinicalHistoryService: ClinicalHistoryService,
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  loadClinicalHistory() {
    const clinicalId = this.route.snapshot.params['clinicalHistoryId'];
    const id = this.route.snapshot.params['id'];

    this.patientService.getById(id).subscribe((patient: Patient) => {
      this.patient = patient;
    });
    this.clinicalHistoryService.getById(clinicalId).subscribe((clinicalHistory: ClinicalHistory) => {
      this.clinicalHistory = clinicalHistory;
    });

  }
  ngOnInit() {
    this.loadClinicalHistory();
  }

}
