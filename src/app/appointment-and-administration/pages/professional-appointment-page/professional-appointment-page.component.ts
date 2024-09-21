import {Component, inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Session} from "../../model/sesion.entity";
import {Patient} from "../../../shared/model/patient.entity";
import {ActivatedRoute} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {PatientService} from "../../../shared/services/patient.service";
import {DatePipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-professional-appointment-page',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    NgForOf
  ],
  templateUrl: './professional-appointment-page.component.html',
  styleUrl: './professional-appointment-page.component.css'
})
export class ProfessionalAppointmentPageComponent implements OnInit {
  professionalId!: number; // To store the professional ID from the route
  dataSource!: MatTableDataSource<Session>;
  patientMap: { [key: number]: Patient } = {}; // To store patient details based on patient ID

  private route = inject(ActivatedRoute);  // To get the route parameters
  private sessionService = inject(SessionService);
  private patientService = inject(PatientService); // Inject PatientService

  constructor() {
    this.dataSource = new MatTableDataSource<Session>();
  }

  ngOnInit(): void {
    // Fetch the professional ID from the route parameters
    this.professionalId = +this.route.snapshot.paramMap.get('id')!;
    this.getProfessionalAppointments(this.professionalId); // Fetch appointments for this professional
  }

  // Fetch appointments for the specific professional by filtering the session data
  private getProfessionalAppointments(professionalId: number): void {
    this.sessionService.getAll().subscribe((sessions: Session[]) => {
      // Filter sessions by professional ID
      const filteredSessions = sessions.filter(session => session.idProfessional === professionalId);
      this.dataSource.data = filteredSessions;

      // Fetch patient details for each appointment
      filteredSessions.forEach(session => {
        this.getPatientDetails(session.idPatient); // Fetch patient details by idPatient
      });
    }, error => {
      console.error("Error fetching professional appointments:", error); // Handle errors
    });
  }

  // Fetch the patient details using patientId and store in patientMap
  private getPatientDetails(patientId: number): void {
    if (!this.patientMap[patientId]) { // Avoid fetching the same patient multiple times
      this.patientService.getById(patientId).subscribe((patient: Patient) => {
        this.patientMap[patientId] = patient; // Store patient details
      }, error => {
        console.error(`Error fetching patient details for ID ${patientId}:`, error); // Handle errors
      });
    }
  }
}
