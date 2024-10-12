import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, formatDate} from "@angular/common";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {Session} from "../../model/sesion.entity";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-professional-appointment-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatCardContent,
    MatCard
  ],
  templateUrl: './professional-appointment-page.component.html',
  styleUrl: './professional-appointment-page.component.css'
})
export class ProfessionalAppointmentPageComponent implements OnInit, AfterViewInit{

  //#region Attributes

  /**
   * @property {string[]} columnsToDisplay - Columns to display in the table.
   */
  protected columnsToDisplay: string[] = ['id', 'idProfessional', 'patientName', 'appointmentDate', 'sessionTime'];

  /**
   * @property {MatTableDataSource<Session>} dataSource - Data source for the table containing session data.
   */
  protected dataSource!: MatTableDataSource<Session>;

  /**
   * @property {MatSort} sort - Used to apply sorting on the table columns.
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * @property {SessionService} sessionService - Injected service to fetch session data.
   */
  private sessionService = inject(SessionService);

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
   * ngOnInit lifecycle hook - Fetches session data when the component is initialized.
   */
  ngOnInit(): void {
    this.getAllSessions(); // Fetch all sessions on component initialization
  }

  /**
   * ngAfterViewInit lifecycle hook - Assigns the sorting logic to the table after the view is initialized.
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort; // Set the sort functionality
  }

  //#endregion

  //#region Methods

  /**
   * Fetch all sessions from the SessionService and populate the data source for the table.
   * This method subscribes to the session data and assigns it to the table's data source.
   */
  private getAllSessions(): void {
    this.sessionService.getAll().subscribe((sessions: Session[]) => {
      this.dataSource.data = sessions; // Populate the dataSource with session data
    });
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

  /**
   * Redirect to the notes page for the given session.
   * @param {number} sessionId - The ID of the session.
   */

  /**
   * Redirect to the task page for the given session.
   * @param {number} sessionId - The ID of the session.
   */
  redirectToTask(sessionId: number, id: number): void {
    this.router.navigate([`/${id}/appointment-list/${sessionId}/task`]);
  }



  //#endregion


}
