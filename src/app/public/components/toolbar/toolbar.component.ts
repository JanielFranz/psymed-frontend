import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from "../../../appointment-and-administration/services/session.service";
import { Store } from '@ngrx/store';
import { AuthState } from "../../../store/auth/auth.state";
import {selectPatientId, selectProfessionalId, selectRolId} from "../../../store/auth/auth.selectors";
import {combineLatest, Observable, Subject} from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatToolbar } from "@angular/material/toolbar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatBadge} from "@angular/material/badge";
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";
import {TranslateModule} from "@ngx-translate/core";
import {reset} from "../../../store/auth/auth.actions";

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
    NgIf,
    LanguageSwitcherComponent,
    TranslateModule,
    NgOptimizedImage
  ],
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  //#region Attributes

  /**
   * @property {Observable<string | null>} rolId$ - Observable for the role ID of the user.
   */
  rolId$!: Observable<string | null>;

  /**
   * @property {Observable<number | null>} patientId$ - Observable for the patient ID of the logged-in user.
   */
  patientId$!: Observable<number | null>;

  /**
   * @property {Observable<string | null>} professionalId$ - Observable for the professional ID of the logged-in user (for role 1).
   */
  professionalId$!: Observable<number | null>;

  /**
   * @property {Array<{path: string, name: string}>} options - Stores navigation options based on role ID.
   */
  options: Array<{ path: string, name: string }> = [];

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
    this.rolId$ = this.store.select(selectRolId);
    this.patientId$ = this.store.select(selectPatientId);
    this.professionalId$ = this.store.select(selectProfessionalId);

    // Combine rolId and professionalId observables and set options accordingly
    combineLatest([this.rolId$, this.professionalId$, this.patientId$])
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(([rolId, professionalId, patientId]) => {
        if (rolId === '1' && professionalId) {
          this.options = [
            { path: '/patient-management', name: 'patient-management' },
            { path: '/appointment-list', name: 'appointments' },
            { path: `/professional/profile/${professionalId}`, name: 'profile' },  // Professional profile link
            { path: '/home', name:'logout' }
          ];
        } else if (rolId === '2' && patientId) {
          this.options = [
            { path: '/mood-state', name: 'mood-state' },
            { path: '/biological-functions', name: 'biological-functions' },
            { path: `/patient/prescription/${patientId}`, name: 'prescription' },
            { path: `/patient/clinical-history`, name: 'clinical-history' },
            { path: `/patient/profile/${patientId}`, name: 'profile' },
            { path: '/home', name:'logout' }
          ];
        } else {
          this.options = [
            { path: '/home', name: 'home' },
            { path: '/login', name: 'login' }
          ];
        }
      });


    // Notification handling is commented out
    /*
    this.notificationService.newAppointmentsCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => {
        this.newAppointmentsCount = count;
      });
    */
  }
  //#region Event Handlers
  protected onLogout(): void  {
    this.store.dispatch(reset());
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
