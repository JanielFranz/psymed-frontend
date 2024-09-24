import {AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Patient} from "../../../shared/model/patient.entity";
import {PatientService} from "../../../shared/services/patient.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatList, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {PatientItemComponent} from "../patient-item/patient-item.component";

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    MatList,
    PatientItemComponent,
    MatListSubheaderCssMatStyler
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {

  @Input() patients!: Array<Patient>
  @Output() patientSelected = new EventEmitter<{patient: Patient, feature: string}>();

  onPatientSelected(feature: {patient: Patient, feature: string}) {
    this.patientSelected.emit(feature)
  }
/*

  //#region Attributes
  protected patientData!: Patient;
  protected columnsToDisplay: string[] = ['id', 'name', 'lastName'];
  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false})
  protected sort!: MatSort;
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<any>;
  private patientService: PatientService = inject(PatientService);

  constructor() {
    this.editMode = false;
    this.patientData = new Patient({});
    this.dataSource = new MatTableDataSource();
    console.log(this.patientData);
  }

  //#region Methods
  protected onEditItem(item: Patient){
    this.editMode = true;
    this.patientData = item;
  }

  private deletePatient(id: number){
    // TODO: Delete patient
  }


  getAllPatients(){
    // TODO: Get all patients
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getAllPatients();
  }
*/



}
