import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClinicalHistoryService} from "../../services/clinical-history.service";
import {ClinicalHistory} from "../../model/clinical-history.entity";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";

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
    MatDatepicker
  ],
  templateUrl: './clinical-history-form.component.html',
  styleUrl: './clinical-history-form.component.css'
})
export class ClinicalHistoryFormComponent implements OnInit {
  clinicalHistoryForm!: FormGroup;
  patientId!: number; // Define the patient ID as a number

  constructor(private fb: FormBuilder, private clinicalHistoryService: ClinicalHistoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log("on init");

    this.patientId = +this.route.snapshot.paramMap.get('patientId')!; // Get the patient ID from the route using the ActivatedRoute service
    console.log("Patient ID:", this.patientId); // Log the patient ID to the console for security

    this.clinicalHistoryForm = this.fb.group({
      Background: ['', Validators.required],
      consultationReason: ['', Validators.required],
      symptoms: ['', Validators.required],
      date: ['', [Validators.required]]
    });
  }




}
