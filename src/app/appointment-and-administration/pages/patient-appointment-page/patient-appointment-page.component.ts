import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { SessionService } from "../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router"; // To get the route parameter for patient ID
import { CommonModule, formatDate } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { AppointmentFormComponent } from "../../components/appointment-form/appointment-form.component";
import { MedicationFormComponent } from "../../../medication-management/modules/medication-form/medication-form.component";
import {Session} from "../../model/sesion.entity";

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

  //#region Attributes

  /**
   * @property {string[]} columnsToDisplay - Columns to display in the appointments table.
   */
  protected columnsToDisplay: string[] = ['id', 'idProfessional', 'patientName', 'appointmentDate', 'sessionTime'];

  /**
   * @property {MatTableDataSource<Session>} dataSource - Data source for the table containing session data.
   */
  protected dataSource!: MatTableDataSource<Session>;

  /**
   * @property {number} patientId - Holds the patient ID from the route.
   */
  patientId!: number;

  /**
   * @property {MatSort} sort - Used to apply sorting on the table columns.
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * @property {SessionService} sessionService - Injected service to fetch session data.
   * @property {ActivatedRoute} route - Injected service to access route parameters.
   */
  private sessionService = inject(SessionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router)

  //#endregion

  //#region Constructor

  /**
   * Constructor initializes the dataSource with an empty array.
   */
  constructor() {
    this.dataSource = new MatTableDataSource<Session>();
  }

  //#endregion

  //#region Lifecycle Hooks

  /**
   * ngOnInit lifecycle hook - Fetches patient ID from route and retrieves sessions when the component is initialized.
   */
  ngOnInit(): void {
    // Get the patient ID from the route parameters
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    this.getPatientSessions(this.patientId); // Fetch sessions for this patient
  }

  /**
   * ngAfterViewInit lifecycle hook - Assigns the sorting logic to the table after the view is initialized.
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort; // Set the sort functionality for the table
  }

  //#endregion

  //#region Methods

  /**
   * Fetch sessions filtered by patient ID.
   * @param {number} patientId - The ID of the patient to filter sessions.
   */
  private getPatientSessions(patientId: number): void {
    this.sessionService.getAll().subscribe((sessions: Session[]) => {
      // Filter the sessions by patient ID
      this.dataSource.data = sessions.filter(session => session.patient.id === patientId);
    });
  }


  redirectToTask(sessionId: number, patientId: number): void {
    this.router.navigate([`/patient-management/${patientId}/patient-appointment-list/${sessionId}/task`]);
  }

  /**
   * Calculate the end time of the session by adding the session time to the appointment start time.
   * @param {string} appointmentDate - The start date and time of the appointment in ISO format.
   * @param {number} sessionTime - The duration of the session in hours.
   * @returns {string} - The formatted end time of the session as a string in 'shortTime' format.
   */
  calculateEndTime(appointmentDate: string, sessionTime: number): string {
    const startTime = new Date(appointmentDate);
    const endTime = new Date(startTime.getTime() + sessionTime * 60 * 60 * 1000); // Add sessionTime in hours

    // Format the end time using the 'shortTime' format
    return formatDate(endTime, 'shortTime', 'en-US');
  }

  //#endregion

  //#region Event Handlers
  onNoteSelected(appointmentId: number) {
    this.router.navigate([`/patient-management/${this.patientId}/patient-appointment-list/${appointmentId}/notes`]).then();
  }
  //#endregion
}
