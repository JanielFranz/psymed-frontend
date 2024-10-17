import {Component, Input} from '@angular/core';
import {MoodState} from "../../models/mood-state.entity";

@Component({
  selector: 'app-mood-card',
  standalone: true,
  imports: [],
  templateUrl: './mood-card.component.html',
  styleUrl: './mood-card.component.css'
})
export class MoodCardComponent {
  @Input() moodState!: MoodState;

  getMoodImage(mood: number): string {
    switch (mood) {
      case 1:
        return 'assets/images/mood-1.png';
      case 2:
        return 'assets/images/mood-2.png';
      case 3:
        return 'assets/images/mood-3.png';
      case 4:
        return 'assets/images/mood-4.png';
      case 5:
        return 'assets/images/mood-5.png';
      default:
        return 'assets/images/default-mood.png';
    }
  }

}
