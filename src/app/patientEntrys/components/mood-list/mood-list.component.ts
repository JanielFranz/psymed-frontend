import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MoodCardComponent} from "../mood-card/mood-card.component";
import {MoodState} from "../../models/mood-state.entity";
import {MoodStateService} from "../../services/mood-state.service";
import {ActivatedRoute} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-mood-list',
  standalone: true,
  imports: [CommonModule, MoodCardComponent, TranslateModule],
  templateUrl: './mood-list.component.html',
  styleUrl: './mood-list.component.css'
})
export class MoodListComponent implements OnInit{
  @Input() moodStates!: any[];

  constructor(private moodService: MoodStateService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const patientId = Number(this.route.snapshot.paramMap.get("id"));

    this.moodService.getMoodStatesByPatientId(patientId, localStorage.getItem("authToken")).subscribe((moodstates: any) => {
      this.moodStates = moodstates;
      console.log("Mood States Loaded:", JSON.stringify(this.moodStates));
    });
  }
  getImageUrl(mood: number): string {
    switch (mood) {
      case 1:
        return 'https://i.postimg.cc/2yvZVLTd/sosad.jpg';
      case 2:
        return 'https://i.postimg.cc/8CKW3Sjv/sad.jpg';
      case 3:
        return 'https://i.postimg.cc/6Q5nY35w/calm.jpg';
      case 4:
        return 'https://i.postimg.cc/2SxnQvY2/happy.jpg';
      case 5:
        return 'https://i.postimg.cc/44M7VP9J/sohappy.jpg';
      default:
        return 'https://i.postimg.cc/placeholder.png';
    }
  }


}
