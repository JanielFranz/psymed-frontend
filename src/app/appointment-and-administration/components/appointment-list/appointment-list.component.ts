import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { Session } from '../../model/sesion.entity';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { UserManagementService } from '../../../user-mamagement/services/user-management.service';
import { ProfessionalService } from '../../../shared/services/professional.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    DatePipe,
    MatButtonModule,
    NgIf
  ],
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  patientId!: number;
  professionalId!: number;
  entityName!: string;
  userRole!: string;

  constructor(
    private sessionService: SessionService,
    private userManagementService: UserManagementService,
    private professionalService: ProfessionalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeEntity();
  }

  private initializeEntity(): void {
    const entityIdFromUrl = this.route.snapshot.paramMap.get('id');
    this.userRole = localStorage.getItem('role') || '';
    const profileIdFromStorage = localStorage.getItem('profileId');

    if (entityIdFromUrl) {
      const entityId = +entityIdFromUrl;
      if (this.userRole === 'ROLE_PATIENT') {
        this.patientId = entityId;
        this.getPatientDetailsAndSessions();
      } else if (this.userRole === 'ROLE_PROFESSIONAL') {
        this.patientId = entityId;
        this.getPatientDetailsAndSessions();
      }
    } else if (profileIdFromStorage) {
      if (this.userRole === 'ROLE_PATIENT') {
        this.patientId = +profileIdFromStorage;
        this.getPatientDetailsAndSessions();
      } else if (this.userRole === 'ROLE_PROFESSIONAL') {
        this.professionalId = +profileIdFromStorage;
        this.getProfessionalDetailsAndSessions();
      }
    } else {
      console.error('Entity ID is not found in the URL or storage.');
    }
  }

  private getPatientDetailsAndSessions(): void {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('Authorization token is missing');
      return;
    }

    this.userManagementService.getPatientById(this.patientId, authToken).subscribe({
      next: (patient: { fullName: string }) => {
        this.entityName = patient.fullName;
        this.getPatientSessions(authToken);
      },
      error: (err) => {
        console.error('Error fetching patient details:', err);
      }
    });
  }

  private getProfessionalDetailsAndSessions(): void {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('Authorization token is missing');
      return;
    }

    this.professionalService.getProfessionalByProfileId(this.professionalId, authToken).subscribe({
      next: (professional: { fullName: string }) => {
        this.entityName = professional.fullName;
        this.getProfessionalSessions(authToken);
      },
      error: (err: any) => {
        console.error('Error fetching professional details:', err);
      }
    });
  }

  private getPatientInfoForSessions(session: any, authToken: string): Promise<void> {
    return new Promise((resolve) => {
      this.userManagementService.getPatientById(session.patientId, authToken).subscribe({
        next: (patient: { fullName: string }) => {
          session.patientName = patient.fullName;
          resolve();
        },
        error: (err) => {
          console.error(`Error fetching patient details for session ${session.id}:`, err);
          session.patientName = 'Unknown';
          resolve();
        }
      });
    });
  }

  private async getProfessionalSessions(authToken: string): Promise<void> {
    this.sessionService.getSessionsByProfessionalID(this.professionalId, authToken).subscribe({
      next: async (sessions: any[]) => {
        const promises = sessions.map((session) =>
          this.getPatientInfoForSessions(session, authToken)
        );
        await Promise.all(promises);
        this.dataSource.data = sessions;
      },
      error: (err) => {
        console.error('Error fetching professional sessions:', err);
      }
    });
  }

  private getPatientSessions(authToken: string): void {
    this.sessionService.getSessionsByPatientID(this.patientId, authToken).subscribe({
      next: (sessions: Session[]) => {
        this.dataSource.data = sessions;
      },
      error: (err) => {
        console.error('Error fetching patient sessions:', err);
      }
    });
  }
  redirectToTask(sessionId: number): void {
    this.router.navigate([`/management/${this.professionalId || this.patientId}/appointment-list/${sessionId}/task`]);
  }

  onNoteSelected(sessionId: number): void {
    this.router.navigate([`/management/${this.professionalId || this.patientId}/appointment-list/${sessionId}/notes`]);
  }

  calculateEndTime(appointmentDate: string, sessionTime: number): string {
    const startTime = new Date(appointmentDate);
    const endTime = new Date(startTime.getTime() + sessionTime * 60 * 60 * 1000);
    return endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
