import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClinicalHistoryService} from "../../services/clinical-history.service";
import {ClinicalHistory} from "../../model/clinical-history.entity";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute} from "@angular/router";
import {NgIf, CommonModule} from "@angular/common";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatLabel} from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-clinical-history-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatLabel,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './clinical-history-form.component.html',
  styleUrl: './clinical-history-form.component.css'
})
export class ClinicalHistoryFormComponent implements OnInit {
  clinicalHistoryForm!: FormGroup;
  historyId!: number;

  constructor(private fb: FormBuilder, private clinicalHistoryService: ClinicalHistoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log("on init");

    this.historyId = +this.route.snapshot.paramMap.get('historyId')!; // Get the patient ID from the route using the ActivatedRoute service
    console.log("History ID:", this.historyId); // Log the patient ID to the console for security

    this.clinicalHistoryForm = this.fb.group({
      Background: ['', Validators.required],
      consultationReason: ['', Validators.required],
      symptoms: ['', Validators.required],
      date: ['', [Validators.required]]
    });
  }
  onSubmit() {
    console.log("Form submitted");
    console.log(this.clinicalHistoryForm.value);

    if (this.clinicalHistoryForm.valid) {
      const formValues = this.clinicalHistoryForm.value;
      const clinicalHistory = new ClinicalHistory({
        id: this.historyId,
        background: formValues.Background,
        consultationReason: formValues.consultationReason,
        symptoms: formValues.symptoms,
        date: formValues.date
      });

      if(this.clinicalHistoryService.existsById(this.historyId)) {
        this.clinicalHistoryService.updateClinicalHistory(this.historyId, clinicalHistory);
        console.log("Updated clinical history");
      }
      else {
        this.clinicalHistoryService.create(clinicalHistory);
        console.log("Created clinical history");
      }
    }
    else {
      console.error('Form is invalid');
    }
  }
}
