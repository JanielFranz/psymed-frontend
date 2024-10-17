import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MoodCardComponent} from "../mood-card/mood-card.component";
import {MoodState} from "../../models/mood-state.entity";
import {MoodStateService} from "../../services/mood-state.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mood-list',
  standalone: true,
  imports: [CommonModule, MoodCardComponent],
  templateUrl: './mood-list.component.html',
  styleUrl: './mood-list.component.css'
})
export class MoodListComponent implements OnInit{
  @Input() moodStates!: MoodState[];

  constructor(private moodService: MoodStateService,
              private route: ActivatedRoute
              ) {
  }

  ngOnInit() {
    const patientId = Number(this.route.snapshot.paramMap.get("id"));

    this.moodService.getMoodStatesByPatientId(patientId).subscribe((moodstates: MoodState[] ) =>{
      this.moodStates = moodstates;
      }
    );
  }

}
