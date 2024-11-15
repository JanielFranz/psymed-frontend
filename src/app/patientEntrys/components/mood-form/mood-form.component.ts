import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoodState } from '../../models/mood-state.entity';
import { MoodStateService } from '../../services/mood-state.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/auth/auth.state';
import { Observable, Subject } from 'rxjs';
import { selectProfileId } from '../../../store/auth/auth.selectors';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mood-form',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './mood-form.component.html',
  styleUrls: ['./mood-form.component.css']
})
export class MoodFormComponent implements OnInit, OnDestroy {
  patientId!: number | null;
  currentDate: string = this.formatDate(new Date());
  patientId$!: Observable<number | null>;

  /**
   * Flag to check if today's mood has already been recorded
   */
  private isMoodRecordedToday = false;

  /**
   * Subject to handle unsubscription
   */
  private destroy$ = new Subject<void>();

  constructor(
    private translateService: TranslateService,
    private moodStateService: MoodStateService,
    private store: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.patientId$ = this.store.select(selectProfileId);
    this.patientId$
      .pipe(takeUntil(this.destroy$))
      .subscribe(patientId => {
        this.patientId = patientId;
        console.log('Patient Id for mood statement:', this.patientId);
      });
  }

  // Function to format date as "yyyy-MM-dd"
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  selectMood(mood: number) {
    if (this.isMoodRecordedToday) {
      console.log("Mood already recorded for today.");
      return; // Prevent further action if today's mood is already recorded
    }

    this.patientId$
      .pipe(takeUntil(this.destroy$))
      .subscribe(patientId => {
        if (patientId !== null) {
          this.moodStateService.getMoodStatesByPatientId(patientId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(moodStates => {
              const existingMood = moodStates.find(m => this.formatDate(new Date(m.createdAt)) === this.currentDate);
              if (existingMood) {
                this.isMoodRecordedToday = true; // Set flag to prevent further attempts
                this.translateService.get("pages.mood-state.error.already-mood-recorded").subscribe((text: string) => {
                  alert(text);
                });
              } else {
                const newMood = new MoodState(1, patientId, mood, this.currentDate);
                this.moodStateService.createMoodState(newMood, patientId).subscribe(() => {
                  this.isMoodRecordedToday = true; // Set flag after successful creation
                  this.translateService.get("pages.mood-state.success.mood-recorded").subscribe((text: string) => {
                    alert(text); // Display success message
                  });
                });
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Trigger unsubscribe for all subscriptions
    this.destroy$.complete(); // Complete the destroy$ subject
  }
}
