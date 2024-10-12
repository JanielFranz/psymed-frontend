import { Component } from '@angular/core';
import {TaskListComponent} from "../../components/task-list/task-list.component";
import {TaskFormComponent} from "../../components/task-form/task-form.component";

@Component({
  selector: 'app-professional-view-task',
  standalone: true,
  imports: [
    TaskListComponent,
    TaskFormComponent
  ],
  templateUrl: './professional-view-task.component.html',
  styleUrl: './professional-view-task.component.css'
})
export class ProfessionalViewTaskComponent {

}
