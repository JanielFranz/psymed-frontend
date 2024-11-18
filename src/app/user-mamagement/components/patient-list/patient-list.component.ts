import {AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Patient} from "../../../shared/model/patient.entity";
import {MatList, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {PatientItemComponent} from "../patient-item/patient-item.component";
import {MatCard} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {NgForOf} from "@angular/common";
import {PatientProfile} from "../../../shared/model/patient-profile.entity";

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    MatList,
    PatientItemComponent,
    MatListSubheaderCssMatStyler,
    MatCard,
    TranslateModule,
    NgForOf
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {

  @Input() patients!: Array<PatientProfile>
  @Output() patientSelected = new EventEmitter<{patient: PatientProfile, feature: string}>();

  onPatientSelected(feature: {patient: PatientProfile, feature: string}) {
    this.patientSelected.emit(feature);
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
