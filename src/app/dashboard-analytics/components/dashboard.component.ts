import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../shared/services/patient.service";

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

    constructor(private patientService: PatientService) {
    }
    private getPatientById(id: number): void {
      this.patientService.getById(id)
        .subscribe(patient => {
          console.log(patient);
        })
    }
    ngOnInit(): void {
      this.getPatientById(1);
    }


}
