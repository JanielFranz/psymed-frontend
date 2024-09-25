import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from "../../../appointment-and-administration/services/notification.service";
import { SessionService } from "../../../appointment-and-administration/services/session.service";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatIcon } from "@angular/material/icon";
import { MatBadge } from "@angular/material/badge";
import { Store } from '@ngrx/store';
import { AuthState } from "../../../store/auth/auth.state";
import {selectPatientId, selectRolId} from "../../../store/auth/auth.selectors";
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

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
  newAppointmentsCount: number = 0; // Counter for new appointments
  appointments: any[] = []; // Array to hold appointments list
  rolid$!: Observable<string | null>; // Observable for role ID
  patientId$!: Observable<number | null>;
  options: Array<{ path: string, title: string }> = []; // Array to store the navigation options

  private destroy$: Subject<boolean> = new Subject<boolean>(); // To handle unsubscription

  constructor(
    private notificationService: NotificationService,
    private appointmentService: SessionService, // Inject the appointment service
    private store: Store<AuthState> // Inject the store for role ID
  ) {}

  ngOnInit(): void {
    // Subscribe to role ID from store and update options accordingly
    this.rolid$ = this.store.select(selectRolId);
    this.patientId$ = this.store.select(selectPatientId);
    console.log('observable', this.patientId$)
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
            { path: '/home',        title: 'Home' },
            { path: '/mood-state',  title: 'Mood State' },
          ];
        } else {
          this.options = [
            { path: '/home', title: 'Home' },
            { path: '/login', title: 'Login' }
          ];
        }
      }),
      takeUntil(this.destroy$) // Ensure unsubscription
    ).subscribe();

    // Subscribe to the observable that tracks the count of new appointments
    this.notificationService.newAppointmentsCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => {
        this.newAppointmentsCount = count;
      });
  }

  // Reset the notifications count and fetch the appointments list
  viewNotifications(): void {
    this.notificationService.resetCounter();
    this.fetchAppointments();
  }

  // Fetch appointments from the service
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

  // Unsubscribe from observables to avoid memory leaks
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
