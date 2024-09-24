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
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router
import { NgIf } from "@angular/common";
import { NotificationService } from "../../services/notification.service";

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
    NgIf
  ],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm!: FormGroup;
  patientDetails: Patient | null = null; // To hold patient details
  patientId!: number; // To hold the patient ID from the URL
  idProfessional: number = 1; // Professional ID is fixed to 1
  private lastSessionId: number = 0; // To hold the last used session ID

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private patientService: PatientService,
    private route: ActivatedRoute, // Inject ActivatedRoute to access the URL parameter
    private router: Router, // Inject Router for navigation
    private notificationService: NotificationService // Inject NotificationService
  ) {}

  ngOnInit(): void {
    // Load the lastSessionId from localStorage (if available)
    const storedLastSessionId = localStorage.getItem('lastSessionId');
    this.lastSessionId = storedLastSessionId ? +storedLastSessionId : 0;

    // Get the patientId from the URL
    const patientIdFromUrl = this.route.snapshot.paramMap.get('id');

    if (patientIdFromUrl) {
      this.patientId = +patientIdFromUrl; // Store the patientId as a number
      // Initialize the form with validators
      this.appointmentForm = this.fb.group({
        idProfessional: [this.idProfessional, Validators.required], // Professional ID is fixed
        appointmentDate: ['', Validators.required],
        appointmentTime: ['', Validators.required],
        sessionTime: ['', [Validators.required, Validators.min(1)]]
      });

      // Fetch patient details based on the patientId from the URL
      this.fetchPatientDetails(this.patientId);
    } else {
      console.error('Patient ID not found in URL');
    }
  }

  // Fetch patient details based on patient ID
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

  // Handle form submission
  onSubmit(): void {
    if (this.appointmentForm.valid && this.patientDetails) {
      const formValues = this.appointmentForm.value;
      const appointmentDateTime = new Date(formValues.appointmentDate);

      // Parse the time
      const [hours, minutes] = formValues.appointmentTime.split(':');
      if (!hours || !minutes) {
        console.error('Invalid time format');
        return;
      }
      appointmentDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

      // Increment the last session ID
      this.lastSessionId++;

      // Save the last session ID to localStorage for persistence
      localStorage.setItem('lastSessionId', this.lastSessionId.toString());

      // Create a new session object with the form data, using the patientId from the URL
      const newSession = new Session({
        id: this.lastSessionId, // Generate a new unique ID for the session
        idProfessional: this.idProfessional, // Fixed value 1 for professional
        patient: {
          id: this.patientId, // Use the patientId from the URL
          name: this.patientDetails?.name || '',
          lastName: this.patientDetails?.lastName || ''
        },
        idNote: this.patientId, // Use the patientId for idNote (adjust if necessary)
        appointmentDate: appointmentDateTime.toISOString(),
        sessionTime: formValues.sessionTime,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Save the session using the sessionService
      this.sessionService.create(newSession).subscribe({
        next: (response) => {
          console.log('Session saved:', response);
          this.appointmentForm.reset(); // Reset the form after saving
          this.patientDetails = null; // Reset patient details after submission

          // Increment the counter for new appointments
          this.notificationService.incrementCounter();

          // Optionally, redirect to a success page or show a success message instead of reloading
          this.router.navigate(['/appointments-success']); // Example success page navigation
        },
        error: (error) => {
          console.error('Error saving session:', error);
        }
      });
    } else {
      console.error('Form is invalid or patient details are missing');
    }
  }
}
