import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from "../../services/session.service";
import { PatientService } from "../../../shared/services/patient.service";
import { Session } from "../../model/sesion.entity";
import { Patient } from "../../../shared/model/patient.entity";

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm!: FormGroup;
  patientDetails: Patient | null = null; // To hold patient details

  constructor(private fb: FormBuilder, private sessionService: SessionService, private patientService: PatientService) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      patientId: ['', Validators.required],
      idProfessional: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      sessionTime: ['', [Validators.required, Validators.min(1)]]
    });

    this.appointmentForm.get('patientId')?.valueChanges.subscribe(patientId => {
      if (patientId) {
        this.fetchPatientDetails(patientId);
      }
    });
  }

  fetchPatientDetails(patientId: number): void {
    this.patientService.getById(patientId).subscribe({
      next: (patient: Patient) => {
        this.patientDetails = patient; // Store patient details
      },
      error: (error) => {
        console.error('Error fetching patient details:', error);
        this.patientDetails = null; // Reset on error
      }
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid && this.patientDetails) {
      const formValues = this.appointmentForm.value;
      const appointmentDateTime = new Date(formValues.appointmentDate);
      const [hours, minutes] = formValues.appointmentTime.split(':');
      appointmentDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

      const newSession = new Session({
        id: 0, // Typically handled by the backend
        idProfessional: formValues.idProfessional,
        patient: {
          id: formValues.patientId, // Ensure this is set to the correct patient ID
          name: this.patientDetails.name,
          lastName: this.patientDetails.lastName
        },
        idNote: formValues.patientId, // Adjust as needed
        appointmentDate: appointmentDateTime.toISOString(),
        sessionTime: formValues.sessionTime,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      this.sessionService.create(newSession).subscribe({
        next: (response) => {
          console.log('Session saved:', response);
          this.appointmentForm.reset();
          this.patientDetails = null; // Reset patient details after submission
        },
        error: (error) => {
          console.error('Error saving session:', error);
        }
      });
    } else {
      console.error('Form is invalid or patient details are missing');
    }
  }



  protected readonly window = window;
}
