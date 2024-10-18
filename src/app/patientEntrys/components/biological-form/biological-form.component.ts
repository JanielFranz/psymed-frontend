import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BiologicalFunctions } from '../../models/biological-functions.entity';
import { BiologicalFunctionsService } from '../../services/biological-functions.service';
import {FormsModule} from "@angular/forms";
import {map, Observable} from "rxjs";
import {AuthState} from "../../../store/auth/auth.state";
import {Store} from "@ngrx/store";
import {selectPatientId} from "../../../store/auth/auth.selectors";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-biological-form',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule
  ],
  templateUrl: './biological-form.component.html',
  styleUrls: ['./biological-form.component.css']
})
//CHEQUEAR EL USO DE PATIENTID$
export class BiologicalFormComponent implements OnInit {
  patientId!: number | null;
  patientId$!: Observable<number | null>;
  currentDate: string = new Date().toLocaleDateString().split('T')[0];
  biologicalFunctions: BiologicalFunctions = new BiologicalFunctions(1, 1, 1, 1, 1, this.currentDate, this.currentDate, 0);

  constructor(private biologicalFunctionsService: BiologicalFunctionsService,
              private route: ActivatedRoute,
              private store : Store<AuthState>) {}

  ngOnInit(): void {
    // this.patientId = +this.route.snapshot.paramMap.get('patientId')!;
    this.patientId$ = this.store.select(selectPatientId);
    this.patientId$.subscribe(patientId => {
      this.patientId = patientId;
      if(this.patientId!== null) {
        this.biologicalFunctions.idPatient = this.patientId;
      }
      else {
        alert('Patient ID unavailable');
      }
      console.log('Patient Id:', this.patientId);
    })

  }

  onSubmit() {
    this.biologicalFunctions.updatedAt = new Date().toISOString().split('T')[0];
    this.patientId$.pipe(
      map((patientId) => {
        if(patientId !== null) {
          this.biologicalFunctionsService.createBiologicalFunctions(this.biologicalFunctions, patientId).subscribe(() => {
            console.log('Biological functions created successfully');
          });
        } else {
          alert('Patient ID unavailable');
        }
      })
    ).subscribe();
  }
}
