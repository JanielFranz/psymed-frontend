import { Component } from '@angular/core';
import {TaskListComponent} from "../../components/task-list/task-list.component";

@Component({
  selector: 'app-patient-view-task',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './patient-view-task.component.html',
  styleUrl: './patient-view-task.component.css'
})
export class PatientViewTaskComponent {

}
