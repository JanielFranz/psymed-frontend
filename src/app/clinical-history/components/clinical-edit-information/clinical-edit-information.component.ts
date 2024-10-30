import {Component, OnInit} from '@angular/core';
import {ClinicalHistoryService} from "../../services/clinical-history.service";
import {ClinicalHistory} from "../../models/clinical-history.entity";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Location} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-clinical-edit-information',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule
  ],
  templateUrl: './clinical-edit-information.component.html',
  styleUrl: './clinical-edit-information.component.css'
})
export class ClinicalEditInformationComponent implements OnInit{
  clinicalHistory!: ClinicalHistory;

  constructor(
    private route: ActivatedRoute,
    private clinicalHistoryService: ClinicalHistoryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadClinicalHistory();

  }

  loadClinicalHistory() {
    const clinicalId = this.route.snapshot.params['clinicalHistoryId'];
    this.clinicalHistoryService.getById(clinicalId).subscribe((clinicalHistory: ClinicalHistory) => {
      this.clinicalHistory = clinicalHistory;
    });
    console.clear();
  }

  save() {
    this.clinicalHistory.date = new Date().toLocaleDateString();
    console.log("the id for edit clinical history:" + this.clinicalHistory.id)
    this.clinicalHistoryService.updateClinicalHistory(this.clinicalHistory);
    this.location.back();
  }
}
