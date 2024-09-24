import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Medication } from '../../models/medication.entity';
import { MedicationService } from '../../services/medication.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-medication-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './medication-form.component.html',
  styleUrls: ['./medication-form.component.css']
})
export class MedicationFormComponent implements OnInit {
  medicationForm!: FormGroup;  // we Define the form group
  patientId!: number; // Define the patient ID as a number
  constructor(private fb: FormBuilder, private medicationService: MedicationService, private route: ActivatedRoute) {
  }

  /**
   * @description
   * This method is called when the component is initialized.
   */

  ngOnInit(): void {
    console.log("on init");

    this.patientId = +this.route.snapshot.paramMap.get('patientId')!; // Get the patient ID from the route using the ActivatedRoute service
    console.log("Patient ID:", this.patientId); // Log the patient ID to the console for security

    this.medicationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      interval: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  /**
   * @description
   * This method is called when the form is submitted.
   */
  onSubmit(): void {
    if (this.medicationForm.valid) {
      const formValues = this.medicationForm.value;
      const newMedication = new Medication({  // Create a new medication object using the form values
        name: formValues.name,
        description: formValues.description,
        id: 0, // Assuming ID is auto-generated
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        interval: formValues.interval,
        quantity: formValues.quantity,
        patientId: this.patientId
      });

      this.medicationService.createMedication(newMedication, this.patientId).subscribe({
        next: (response) => {
          console.log('Medication saved:', response);
        },
        error: (error) => {
          console.error('Error saving medication:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  protected readonly window = window; // Define the window object
}
