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
    let imagePath = '';
    switch (mood) {
      case 1:
        imagePath = 'assets/images/mood-1.png';
        break;
      case 2:
        imagePath = 'assets/images/mood-2.png';
        break;
      case 3:
        imagePath = 'assets/images/mood-3.png';
        break;
      case 4:
        imagePath = 'assets/images/mood-4.png';
        break;
      case 5:
        imagePath = 'assets/images/mood-5.png';
        break;
      default:
        imagePath = 'assets/images/default-mood.png';
    }
    console.log(`Mood: ${mood}, Image Path: ${imagePath}`);
    return imagePath;
  }


}
