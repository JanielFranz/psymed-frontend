import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Patient} from "../../../shared/model/patient.entity";
import {FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-patient-create-and-edit',
  standalone: true,
  imports: [],
  templateUrl: './patient-create-and-edit.component.html',
  styleUrl: './patient-create-and-edit.component.css'
})
export class PatientCreateAndEditComponent {
  @Input() patient!: Patient;
  @Input() editMode: boolean = false;

  @Output() protected patientAdd = new EventEmitter<Patient>();
  @Output() protected patientUpdate = new EventEmitter<Patient>();
  @Output() protected patientCancel = new EventEmitter<void>();

  @ViewChild('patientForm', {static: false}) protected patientForm!: NgForm;

  constructor() {
    this.patient = new Patient();
  }

  private resetEditState(){
    this.patient = new Patient();
    this.editMode = false;
    this.patientForm.reset();
  }

  private isValid = () => this.patientForm.valid;
  protected isEditMode =(): boolean => this.editMode;

  protected onSubmit(){
    if (this.isValid()){
      let emitter = this.isEditMode() ? this.patientUpdate : this.patientAdd;
      emitter.emit(this.patient);
      this.resetEditState();
    }else{
      console.error('The form data is invalid');
    }
  }

  protected onCancel(){
    this.patientCancel.emit();
    this.resetEditState();
  }

}
