import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from "../../../appointment-and-administration/services/session.service";
import { Store } from '@ngrx/store';
import { AuthState } from "../../../store/auth/auth.state";
import {selectPatientId, selectRolId} from "../../../store/auth/auth.selectors";
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { MatAnchor } from "@angular/material/button";
import { NgForOf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  standalone: true,
  imports: [
    DatePipe,
    MatToolbar,
    NgForOf,
    RouterLink,
    MatAnchor,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatBadge,
    MatMenu,
    MatMenuItem,
    NgIf
  ],
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  //#region Attributes

  /**
   * @property {Observable<string | null>} rolid$ - Observable for the role ID of the user.
   */
  rolid$!: Observable<string | null>;

  /**
   * @property {Observable<number | null>} patientId$ - Observable for the patient ID of the logged-in user.
   */
  patientId$!: Observable<number | null>;

  /**
   * @property {Array<{path: string, title: string}>} options - Stores navigation options based on role ID.
   */
  options: Array<{ path: string, title: string }> = [];

  /**
   * @property {Subject<boolean>} destroy$ - Subject to handle unsubscription and prevent memory leaks.
   */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  //#endregion

  //#region Constructor

  /**
   * Constructor injects the necessary services like SessionService and Store.
   * @param {SessionService} appointmentService - Service to manage appointment-related operations.
   * @param {Store<AuthState>} store - Store to manage authentication state.
   */
  constructor(
    private appointmentService: SessionService,
    private store: Store<AuthState>
  ) {}

  //#endregion

  //#region Lifecycle Hooks

  /**
   * ngOnInit lifecycle hook - Initializes observables and sets up options based on role ID.
   */
  ngOnInit(): void {
    this.rolid$ = this.store.select(selectRolId);
    this.patientId$ = this.store.select(selectPatientId);

    // Set up navigation options based on role ID
    this.rolid$.pipe(
      map((rolid) => {
        if (rolid === '1') {
          this.options = [
            { path: '/home', title: 'Home' },
            { path: '/patient-management', title: 'Patient Management' },
            { path: '/appointment-list', title: 'Appointments' },
          ];
        } else if (rolid === '2') {
          this.options = [
            { path: '/home', title: 'Home' },
            { path: '/mood-state', title: 'Mood State' },
            { path: '/biological-functions', title: 'Biological Functions' },
            { path: `/patient/prescription/${patientId}`, title: 'Prescription' },
          ];
        } else {
          this.options = [
            { path: '/home', title: 'Home' },
            { path: '/login', title: 'Login' }
          ];
        }
      }),
      takeUntil(this.destroy$) // Ensure unsubscription on component destroy
    ).subscribe();

    // Notification handling is commented out
    /*
    this.notificationService.newAppointmentsCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => {
        this.newAppointmentsCount = count;
      });
    */
  }

  /**
   * ngOnDestroy lifecycle hook - Cleans up subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.destroy$.next(true); // Emit destroy signal
    this.destroy$.unsubscribe(); // Unsubscribe from observables
  }

  //#endregion

  //#region Commented Out Code

  // Commented out notification variables
  // newAppointmentsCount: number = 0;
  // appointments: any[] = [];

  // Commented out method for viewing notifications
  /*
  viewNotifications(): void {
    this.notificationService.resetCounter();
    this.fetchAppointments();
  }
  */

  // Commented out method to fetch appointments
  /*
  fetchAppointments() {
    this.appointmentService.getAll().subscribe({
      next: (appointments: any[]) => {
        this.appointments = appointments;
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
      }
    });
  }
  */

  //#endregion
}
