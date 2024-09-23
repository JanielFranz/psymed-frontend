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
  protected medicationData!: Medication;
  medicationForm!: FormGroup;  // Define the form group

  constructor(private fb: FormBuilder, private medicationService: MedicationService) {}

  ngOnInit(): void {
    console.log("on init");
    this.getMedicationById(1);
    this.medicationForm = this.fb.group({
      name: ['', Validators.required],
      frequency: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  private getMedicationById(id: number) {
    console.log("Fetching medication data...");
    this.medicationService.getById(id).subscribe({
      next: (response: Medication) => {
        this.medicationData = response;
        console.log("Medication data retrieved:", this.medicationData.name);
      },
      error: (error) => {
        console.error("Failed to fetch medication data:", error);
      },
      complete: () => {
        console.log("Medication data fetch completed");
      }
    });
  }

  onSubmit() {
    if (this.medicationForm.valid) {
      const newMedication = this.medicationForm.value;
      this.medicationService.create(newMedication).subscribe({
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
}
