import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { Session } from '../../model/sesion.entity';
import {DatePipe, NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {Store} from "@ngrx/store";
import {selectPatientId} from "../../../store/auth/auth.selectors";
import {AuthState} from "../../../store/auth/auth.state";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    DatePipe,
    MatButtonModule
  ],
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  dataSource!: MatTableDataSource<Session>;
  constructor(private sessionService: SessionService, private router: Router, private store: Store) {
    this.dataSource = new MatTableDataSource<Session>();
  }

  ngOnInit(): void {
    this.getPatientSessions();
  }

  private getPatientSessions(): void {
    this.store.select(selectPatientId).pipe(take(1)).subscribe({
      next: (patientId) => {
        console.log("Fetched patient ID:", patientId); // Debugging log
        if (patientId) {
          this.sessionService.getSessionsByPatientID(patientId).subscribe({
            next: (sessions: Session[]) => {
              console.log("Fetched sessions:", sessions); // Debugging log
              this.dataSource.data = sessions;
            },
            error: (err) => {
              console.error('Error fetching sessions:', err);
            }
          });
        } else {
          console.warn('Patient ID is null or undefined'); // Debugging log
        }
      },
      error: (err) => {
        console.error('Error fetching patient ID:', err);
      }
    });
  }

  redirectToTask(sessionId: number): void {
    this.router.navigate([`patient/appointment-list/tasks/${sessionId}`]);
  }

  calculateEndTime(appointmentDate: string, sessionTime: number): string {
    const startTime = new Date(appointmentDate);
    const endTime = new Date(startTime.getTime() + sessionTime * 60 * 60 * 1000);
    return endTime.toLocaleTimeString();
  }
}
