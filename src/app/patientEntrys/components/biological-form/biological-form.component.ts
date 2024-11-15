import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BiologicalFunctions } from '../../models/biological-functions.entity';
import { BiologicalFunctionsService } from '../../services/biological-functions.service';
import { FormsModule } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { AuthState } from "../../../store/auth/auth.state";
import { Store } from "@ngrx/store";
import { selectProfileId } from "../../../store/auth/auth.selectors";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { takeUntil } from 'rxjs/operators';

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
  patientId!: number | null;
  patientId$!: Observable<number | null>;
  currentDate: string = new Date().toISOString().split('T')[0];
  biologicalFunctions: BiologicalFunctions = new BiologicalFunctions(1, 1, 1, 1, 1, this.currentDate, this.currentDate, 0);

  /**
   * Flag to check if today's biological functions have already been recorded
   */
  private isBiologicalFunctionRecordedToday = false;

  /**
   * Subject to manage unsubscription and clean up on logout.
   */
  private destroy$ = new Subject<void>();

  constructor(
    private translateService: TranslateService,
    private biologicalFunctionsService: BiologicalFunctionsService,
    private route: ActivatedRoute,
    private store: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.patientId$ = this.store.select(selectProfileId);

    // Subscribe to patientId$ with takeUntil to ensure cleanup on logout
    this.patientId$
      .pipe(takeUntil(this.destroy$))
      .subscribe(patientId => {
        this.patientId = patientId;
        if (this.patientId !== null) {
          this.biologicalFunctions.idPatient = this.patientId;
        }
        console.log('Patient Id:', this.patientId);
      });
  }

  onSubmit() {
    // Avoid re-submission if data has already been recorded today
    if (this.isBiologicalFunctionRecordedToday) {
      console.log("Biological function already recorded for today.");
      return; // Prevent further action if today's data is already recorded
    }

    this.biologicalFunctions.updatedAt = new Date().toISOString().split('T')[0];

    // Use a temporary copy of biological function data
    const tempBiologicalFunctions = { ...this.biologicalFunctions };

    this.patientId$
      .pipe(takeUntil(this.destroy$)) // Ensure unsubscribe on logout
      .subscribe(patientId => {
        if (patientId !== null) {
          this.biologicalFunctionsService.createBiologicalFunctions(tempBiologicalFunctions, patientId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
              if (response.error) {
                this.translateService.get("pages.biological-functions.error.creation-failed").subscribe((text: string) => {
                  alert(text);
                });
              } else {
                this.biologicalFunctions = tempBiologicalFunctions;
                this.isBiologicalFunctionRecordedToday = true; // Set flag after successful creation
                this.translateService.get("pages.biological-functions.success.creation-success").subscribe((text: string) => {
                  alert(text);
                });
                console.log('Biological functions created successfully');
              }
            });
        }
      });
  }

  /**
   * ngOnDestroy lifecycle hook - Unsubscribes from observables to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.destroy$.next();  // Emit value to clean up subscriptions
    this.destroy$.complete(); // Complete the subject
  }
}
