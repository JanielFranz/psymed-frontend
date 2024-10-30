import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MedicationService} from "../../services/medication.service";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {Medication} from "../../models/medication.entity";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-medication-edit-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    NgIf,
    TranslateModule,
    MatLabel,
    MatError
  ],
  templateUrl: './medication-edit-modal.component.html',
  styleUrl: './medication-edit-modal.component.css'
})
export class MedicationEditModalComponent {
  medicationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private medicationService: MedicationService,
    private dialogRef: MatDialogRef<MedicationEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medication
  ) {}

  ngOnInit(): void {
    this.medicationForm = this.fb.group({
      name: [this.data.name, Validators.required],
      description: [this.data.description, Validators.required],
      interval: [this.data.interval, Validators.required],
      quantity: [this.data.quantity, [Validators.required, Validators.min(1)]],
      startDate: [this.data.startDate, Validators.required],
      endDate: [this.data.endDate, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.medicationForm.valid) {
      const updatedMedication = { ...this.data, ...this.medicationForm.value };
      this.medicationService.update(updatedMedication.id, updatedMedication).subscribe({
        next: (response) => {
          console.log('Medication updated:', response);
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error updating medication:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
