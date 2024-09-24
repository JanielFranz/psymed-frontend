import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MoodState} from "../../models/mood-state.entity";
import {MoodStateService} from "../../services/mood-state.service";

@Component({
  selector: 'app-mood-form',
  standalone: true,
  imports: [],
  templateUrl: './mood-form.component.html',
  styleUrl: './mood-form.component.css'
})
export class MoodFormComponent implements OnInit {
  patientId!: number; // Define the patient ID as a number
  currentDate: string = "hoy xd";

  constructor(private moodStateService: MoodStateService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    console.log("on init");
    this.patientId = +this.route.snapshot.paramMap.get('patientId')!; // Get the patient ID from the route using the ActivatedRoute service
    console.log("Patient ID:", this.patientId); // Log the patient ID to the console for security
  }

  selectMood(mood: number) {
    this.moodStateService.getMoodStatesByPatientId(this.patientId).subscribe(moodStates => {
      const existingMood = moodStates.find(m => m.createdAt === this.currentDate);
      if (existingMood) {
        alert('You already have a mood recorded for today.');
      } else {
        const newMood = new MoodState(1, this.patientId, mood, this.currentDate);
        this.moodStateService.createMoodState(newMood, this.patientId).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

}
