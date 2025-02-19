import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Medication } from '../../models/medication.entity';
import { MedicationService } from '../../services/medication.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-medication-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerToggle,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    TranslateModule
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

    this.patientId = +this.route.snapshot.paramMap.get('id')!; // Get the patient ID from the route using the ActivatedRoute service
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
        // startDate: formValues.startDate,
        // endDate: formValues.endDate,
        interval: formValues.interval,
        quantity: formValues.quantity.toString(),
        patientId: this.patientId,
        //status : 0
      });

      this.medicationService.createMedication(newMedication, localStorage.getItem("authToken"))
    } else {
      console.error('Form is invalid');
    }
  }
  protected readonly window = window; // Define the window object
}
