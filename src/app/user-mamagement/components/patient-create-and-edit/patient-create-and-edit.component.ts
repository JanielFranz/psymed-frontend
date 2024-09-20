import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Patient} from "../../../shared/model/patient.entity";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-patient-create-and-edit',
  standalone: true,
  imports: [],
  templateUrl: './patient-create-and-edit.component.html',
  styleUrl: './patient-create-and-edit.component.css'
})
export class PatientCreateAndEditComponent {

  //#region Atributes
  @Input() patient: Patient;
  @Input() editMode: boolean = false;

  @Output() protected patientAddRequest = new EventEmitter<Patient>();
  @Output() protected patientUpdateRequest = new EventEmitter<Patient>();
  @Output() protected canceledRequest = new EventEmitter<void>();

  @ViewChild('patientForm', {static: false}) patientForm!: NgForm;

  //#region

  //#region Methods
  constructor(){
    this.patient = {} as Patient;
    this.editMode = false;
  }

  private resetEditState(){
    this.patient = {} as Patient;
  }

  onSumbit(){
    if(this.patientForm.form.valid){
      let emitter = this.editCanceled? this.patientUpdated : this.patientAdded;
      emitter.emit(this.patient);
      this.resetEditState()
    }
  }




  //#endregion




}
