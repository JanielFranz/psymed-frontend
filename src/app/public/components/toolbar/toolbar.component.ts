import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from "../../../appointment-and-administration/services/session.service";
import { Store } from '@ngrx/store';
import { AuthState } from "../../../store/auth/auth.state";
import {selectPatientId, selectRolId} from "../../../store/auth/auth.selectors";
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import {MatAnchor} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  standalone: true,
  imports: [
    MatAnchor,
    NgForOf,
    RouterLink,
    MatToolbar
  ],
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  // Commented out notification variables
  // newAppointmentsCount: number = 0;
  // appointments: any[] = [];

  rolid$!: Observable<string | null>;
  patientId$!: Observable<number | null>;
  options: Array<{ path: string, title: string }> = [];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    // private notificationService: NotificationService, // Commented out the notification service
    private appointmentService: SessionService,
    private store: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.rolid$ = this.store.select(selectRolId);
    this.patientId$ = this.store.select(selectPatientId);

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
          ];
        } else {
          this.options = [
            { path: '/home', title: 'Home' },
            { path: '/login', title: 'Login' }
          ];
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe();

    // Commented out notification functionality
    /*
    this.notificationService.newAppointmentsCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => {
        this.newAppointmentsCount = count;
      });
    */
  }

  // Commented out viewNotifications method
  /*
  viewNotifications(): void {
    this.notificationService.resetCounter();
    this.fetchAppointments();
  }
  */

  // Commented out fetchAppointments method
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
