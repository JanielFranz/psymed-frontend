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
import {Session} from "../../model/sesion.entity";
import {TranslateModule} from "@ngx-translate/core";

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

  //#region Attributes

  /**
   * @property {FormGroup} appointmentForm - Form group to handle the appointment form controls and validations.
   */
  appointmentForm!: FormGroup;

  /**
   * @property {Patient | null} patientDetails - Holds the details of the selected patient.
   */
  patientDetails: Patient | null = null;

  /**
   * @property {number} patientId - Holds the patient ID extracted from the URL.
   */
  patientId!: number;

  /**
   * @property {number} idProfessional - Hardcoded professional ID, defaulted to 1.
   */
  idProfessional: number = 1;

  /**
   * @property {number} lastSessionId - Stores the last used session ID, retrieved from localStorage.
   */
  private lastSessionId: number = 0;

  //#endregion

  //#region Constructor

  /**
   * Constructor for AppointmentFormComponent.
   * Injects required services such as form builder, session service, patient service, router, and notification service.
   */
  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private patientService: PatientService,
    private route: ActivatedRoute, // For extracting patient ID from URL
    private router: Router, // For navigation after submission
    private notificationService: NotificationService // For managing notifications
  ) {}

  //#endregion

  //#region Lifecycle Methods

  /**
   * ngOnInit lifecycle hook. Initializes the form and loads necessary data (like patient ID and last session ID).
   */
  ngOnInit(): void {
    // Load the lastSessionId from localStorage (if available)
    const storedLastSessionId = localStorage.getItem('lastSessionId');
    this.lastSessionId = storedLastSessionId ? +storedLastSessionId : 0;

    // Get the patientId from the URL
    const patientIdFromUrl = this.route.snapshot.paramMap.get('id');

    if (patientIdFromUrl) {
      this.patientId = +patientIdFromUrl; // Convert the patientId from string to number

      // Initialize the form with form controls and validators
      this.appointmentForm = this.fb.group({
        idProfessional: [this.idProfessional, Validators.required], // Professional ID, fixed
        appointmentDate: ['', Validators.required],
        appointmentTime: ['', Validators.required],
        sessionTime: ['', [Validators.required, Validators.min(1)]]
      });

      // Fetch the patient details using the patientId from the URL
      this.fetchPatientDetails(this.patientId);
    } else {
      console.error('Patient ID not found in URL');
    }
  }

  //#endregion

  //#region Methods

  /**
   * Fetch patient details based on the patient ID.
   * @param {number} patientId - The ID of the patient to fetch details for.
   */
  fetchPatientDetails(patientId: number): void {
    this.patientService.getById(patientId).subscribe({
      next: (patient: Patient) => {
        this.patientDetails = patient; // Store patient details
      },
      error: (error) => {
        console.error('Error fetching patient details:', error);
        this.patientDetails = null; // Reset patient details on error
      }
    });
  }

  /**
   * Handle form submission. Creates a new session based on the form data and saves it using the session service.
   */
  onSubmit(): void {
    if (this.appointmentForm.valid && this.patientDetails) {
      const formValues = this.appointmentForm.value;
      const appointmentDateTime = new Date(formValues.appointmentDate);

      // Parse the time from the form input
      const [hours, minutes] = formValues.appointmentTime.split(':');
      if (!hours || !minutes) {
        console.error('Invalid time format');
        return;
      }
      appointmentDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

      // Increment the last session ID
      this.lastSessionId++;

      // Save the last session ID to localStorage for future sessions
      localStorage.setItem('lastSessionId', this.lastSessionId.toString());

      // Create a new Session object using the form data and patient details
      const newSession = new Session({
        id: this.lastSessionId, // Assign a new session ID
        idProfessional: this.idProfessional, // Fixed value for professional ID
        patient: {
          id: this.patientId, // Use the patient ID from the URL
          name: this.patientDetails?.name || '',
          lastName: this.patientDetails?.lastName || ''
        },
        idNote: this.patientId, // Use patientId as idNote (adjust if necessary)
        appointmentDate: appointmentDateTime.toISOString(),
        sessionTime: formValues.sessionTime,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Save the session through the sessionService
      this.sessionService.create(newSession).subscribe({
        next: (response) => {
          console.log('Session saved:', response);
          this.appointmentForm.reset(); // Reset form after saving
          this.patientDetails = null; // Clear patient details after submission

          // Increment the notification counter for new appointments
          this.notificationService.incrementCounter();

          // Redirect to a success page or show success message
          this.router.navigate(['/appointments-success']);
        },
        error: (error) => {
          console.error('Error saving session:', error);
        }
      });
    } else {
      console.error('Form is invalid or patient details are missing');
    }
  }

  //#endregion
}
