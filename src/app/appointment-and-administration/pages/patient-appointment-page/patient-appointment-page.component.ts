import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {SessionService} from "../../services/session.service";
import {Session} from "../../model/sesion.entity";
import {ActivatedRoute} from "@angular/router"; // Import this to get the route parameter
import {CommonModule, formatDate} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {AppointmentFormComponent} from "../../components/appointment-form/appointment-form.component";
import {MedicationFormComponent} from "../../../medicationManagement/modules/medication-form/medication-form.component";

@Component({
  selector: 'app-patient-appointment-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatCardContent,
    MatCard,
    AppointmentFormComponent,
    MedicationFormComponent
  ],
  templateUrl: './patient-appointment-page.component.html',
  styleUrls: ['./patient-appointment-page.component.css']
})
export class PatientAppointmentPageComponent implements OnInit, AfterViewInit {

  protected columnsToDisplay: string[] = ['id', 'idProfessional', 'patientName', 'appointmentDate', 'sessionTime'];
  protected dataSource!: MatTableDataSource<Session>;
  patientId!: number; // Store the patient ID from the route

  @ViewChild(MatSort) sort!: MatSort;

  private sessionService = inject(SessionService);
  private route = inject(ActivatedRoute); // Inject ActivatedRoute

  constructor() {
    this.dataSource = new MatTableDataSource<Session>();
  }

  ngOnInit(): void {
    // Get the patient ID from the route parameters
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    this.getPatientSessions(this.patientId); // Fetch sessions for this patient
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  // Fetch sessions filtered by patient ID
  private getPatientSessions(patientId: number): void {
    this.sessionService.getAll().subscribe((sessions: Session[]) => {
      // Filter the sessions by patient ID
      this.dataSource.data = sessions.filter(session => session.patient.id === patientId);
    });
  }

  // Method to calculate the end time
  calculateEndTime(appointmentDate: string, sessionTime: number): string {
    const startTime = new Date(appointmentDate);
    const endTime = new Date(startTime.getTime() + sessionTime * 60 * 60 * 1000); // Add sessionTime in hours

    // Format the end time as 'shortTime'
    return formatDate(endTime, 'shortTime', 'en-US');
  }
}
