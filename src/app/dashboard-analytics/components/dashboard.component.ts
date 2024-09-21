import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../shared/services/patient.service";
import {Patient} from "../../shared/model/patient.entity";

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  protected patientData!: Patient;

    constructor(private patientService: PatientService) {
    }
    private getPatientById(id: number) {
      console.log("Entro aca")
      this.patientService.getById(id)
        .subscribe((response: Patient) => {
          this.patientData = response;
          console.log("response", response.accessName);
        })

    }
    ngOnInit(): void {
      console.log("on init")
      this.getPatientById(1);
    }


}
