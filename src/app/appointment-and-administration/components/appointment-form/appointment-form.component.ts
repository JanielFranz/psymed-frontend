import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from "../../services/session.service";
import { PatientService } from "../../../shared/services/patient.service";
import { Patient } from "../../../shared/model/patient.entity";
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from "@angular/common";
import { NotificationService } from "../../services/notification.service";
import { Session } from "../../model/sesion.entity";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    TranslateModule
  ],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm!: FormGroup;
  patientDetails: Patient | null = null;
  patientId!: number;
  professionalId: number = 1;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    console.log('Initializing Appointment Form Component...');
    const patientIdFromUrl = this.route.snapshot.paramMap.get('id');
    console.log('Patient ID from URL:', patientIdFromUrl);

    if (patientIdFromUrl) {
      this.patientId = +patientIdFromUrl;
      console.log('Patient ID successfully parsed:', this.patientId);

      this.appointmentForm = this.fb.group({
        appointmentDate: ['', Validators.required], // Date of appointment
        appointmentTime: ['', Validators.required], // Time of appointment
        sessionTime: ['', [Validators.required, Validators.min(1)]] // Duration of session
      });

      console.log('Appointment form initialized:', this.appointmentForm);
      this.fetchPatientDetails(this.patientId);
    } else {
      console.error('Patient ID not found in URL');
    }
  }

  fetchPatientDetails(patientId: number): void {
    console.log('Fetching patient details for ID:', patientId);
    this.patientService.getById(patientId).subscribe({
      next: (patient: Patient) => {
        console.log('Patient details fetched successfully:', patient);
        this.patientDetails = patient;
      },
      error: (error) => {
        console.error('Error fetching patient details:', error);
        this.patientDetails = null;
      }
    });
  }
  onSubmit(): void {
    console.log('Submitting form...');
    if (this.appointmentForm.valid) {
      console.log('Form is valid. Form values:', this.appointmentForm.value);

      const formValues = this.appointmentForm.value;

      // Combine date and time
      const appointmentDate = new Date(formValues.appointmentDate);
      const [hours, minutes] = formValues.appointmentTime.split(':');
      appointmentDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

      // Generate a unique ID for the session
      const newSessionId = Date.now(); // Use a timestamp or UUID for uniqueness
      console.log('Generated session ID:', newSessionId);

      const newSession: Session = {
        id: newSessionId, // Assign the generated ID
        idProfessional: this.professionalId,
        idPatient: this.patientId,
        sessionTime: formValues.sessionTime,
        appointmentDate: appointmentDate.toISOString(),
      };
      const authToken = localStorage.getItem('authToken'); // Get the token from localStorage
      if (!authToken) {
        console.error('Authorization token is missing');
        return;
      }
      console.log('Submitting new session with ID:', newSession);

      this.sessionService.makeReservation(this.professionalId, this.patientId, newSession, authToken).subscribe({
        next: (response) => {
          console.log('Session created successfully:', response);
          this.router.navigate([`/patient-management/${this.patientId}/patient-appointment-list`]);
        },
        error: (error) => {
          console.error('Error creating session:', error);
        }
      });
    } else {
      console.error('Form is invalid:', this.appointmentForm.errors);
    }
  }
}
