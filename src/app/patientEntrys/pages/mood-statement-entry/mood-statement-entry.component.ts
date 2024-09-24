import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MoodState} from "../../models/mood-state.entity";
import {MoodStateService} from "../../services/mood-state.service";


@Component({
  selector: 'app-mood-statement-entry',
  standalone: true,
  imports: [],
  templateUrl: './mood-statement-entry.component.html',
  styleUrl: './mood-statement-entry.component.css'
})
export class MoodStatementEntryComponent implements OnInit{
  patientId!: number;

  constructor(private moodStateService: MoodStateService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log("on init");
    this.patientId = +this.route.snapshot.paramMap.get('patientId')!;
    console.log("Patient ID:", this.patientId);
  }

}
