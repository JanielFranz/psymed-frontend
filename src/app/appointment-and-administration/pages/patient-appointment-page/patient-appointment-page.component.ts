import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SessionService } from '../../services/session.service';
import { Session } from '../../model/sesion.entity';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-patient-appointment-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './patient-appointment-page.component.html',
  styleUrls: ['./patient-appointment-page.component.css']
})
export class PatientAppointmentPageComponent implements OnInit {
  patientId!: number; // To store the patient ID from the route
  dataSource!: MatTableDataSource<Session>;

  private route = inject(ActivatedRoute);  // To get the route parameters
  private sessionService = inject(SessionService);

  constructor() {
    this.dataSource = new MatTableDataSource<Session>();
  }

  ngOnInit(): void {
    // Fetch the patient ID from the route parameters
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    this.getPatientAppointments(this.patientId); // Fetch appointments for this patient
  }

  // Fetch appointments for the specific patient by filtering the session data
  private getPatientAppointments(patientId: number): void {
    this.sessionService.getAll().subscribe((sessions: Session[]) => {
      // Filter sessions by patient ID
      this.dataSource.data = sessions.filter(session => session.idPatient === patientId);
    }, error => {
      console.error("Error fetching patient appointments:", error); // Handle errors
    });
  }
}
