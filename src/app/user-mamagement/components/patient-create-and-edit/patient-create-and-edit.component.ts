import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Patient} from "../../../shared/model/patient.entity";

@Component({
  selector: 'app-patient-create-and-edit',
  standalone: true,
  imports: [],
  templateUrl: './patient-create-and-edit.component.html',
  styleUrl: './patient-create-and-edit.component.css'
})
export class PatientCreateAndEditComponent {

  //#region Methods
  @Input() patient: Patient;
  @Input() editMode: false;

  @Output() patientAdded = new EventEmitter();
  @Output() patientUpdated = new EventEmitter<Patient>();
  @Output() editCanceled = new EventEmitter();

  //#region

  //#region Methods
  constructor(){
    this.patient = {} as Patient;
  }

  //#endregion




}
