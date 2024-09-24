import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClinicalHistoryService} from "../../services/clinical-history.service";
import {ClinicalHistory} from "../../model/clinical-history.entity";

@Component({
  selector: 'app-clinical-history-form',
  standalone: true,
  imports: [],
  templateUrl: './clinical-history-form.component.html',
  styleUrl: './clinical-history-form.component.css'
})
export class ClinicalHistoryFormComponent implements OnInit {
  clinicalHistoryForm!: FormGroup;

  constructor(private fb: FormBuilder, private clinicalHistoryService: ClinicalHistoryService) {}

  ngOnInit(): void {
    console.log("ngOnInit");
    this.clinicalHistoryService.getAll();
    this.clinicalHistoryForm = this.fb.group({
      background: ['', Validators.required],
      consultationReason: ['', Validators.required],
      symptoms: '',
      //date not yet implemented


    });
  }

  onSubmit(): void {
    if (this.clinicalHistoryForm.valid) {
      const formValues = this.clinicalHistoryForm.value;
      const newClinicalHistory = new ClinicalHistory({
        consultationReason: "", date: undefined,
        background: formValues.background
      });

      this.clinicalHistoryService.createClinicalHistory(newClinicalHistory).subscribe({
        next: (response) => {
          console.log('Clinical History saved: ', response);
        }, error: error => {
          console.error('The clinical history fail to be saved');
        }
      })

    }
  }


}
