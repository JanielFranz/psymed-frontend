import { Component, OnInit, OnDestroy } from '@angular/core';
import { BiologicalFunctions } from '../../models/biological-functions.entity';
import { BiologicalFunctionsService } from '../../services/biological-functions.service';
import { FormsModule } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { TranslateModule } from "@ngx-translate/core";


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
export class BiologicalFormComponent implements OnInit, OnDestroy {

  patientId$!: Observable<number | null>;
  currentDate: string = new Date().toISOString().split('T')[0];
  biologicalFunctions: BiologicalFunctions = new BiologicalFunctions(1, 1, 1, 1, 1, 1);

  private destroy$ = new Subject<void>();

  constructor(
    private biologicalService: BiologicalFunctionsService
  ) {}

  ngOnInit(): void {
    const patientId = localStorage.getItem("profileId");

    if (patientId !== null) {
      this.biologicalFunctions.idPatient = parseInt(patientId);
    } else {
      console.error("Profile ID is null");
    }
  }

  onSubmit() {
    const tempBiologicalFunctions = { ...this.biologicalFunctions };
    const authToken = localStorage.getItem("authToken");

    if (authToken !== null) {
      this.biologicalService.createBiologicalFunctions(tempBiologicalFunctions, authToken);
    } else {
      console.error("Auth token is null");
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
