import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Medication } from '../../models/medication.entity';
import { MedicationService } from '../../services/medication.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

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
  medicationForm!: FormGroup;  // Define the form group
  patientId: number = 2;
  constructor(private fb: FormBuilder, private medicationService: MedicationService) {}

  ngOnInit(): void {
    console.log("on init");
    this.medicationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      interval: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.medicationForm.valid) {
      const formValues = this.medicationForm.value;
      const newMedication = new Medication({
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

  protected readonly window = window;
}
