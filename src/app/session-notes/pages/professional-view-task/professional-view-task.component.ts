import { Component, ViewChild } from '@angular/core';
import {TaskListComponent} from "../../components/task-list/task-list.component";
import {TaskFormComponent} from "../../components/task-form/task-form.component";
import {Task} from "../../model/task.entity";

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
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  onTaskCreated(newTask: Task): void {
    this.taskListComponent.onTaskCreated(newTask);
  }

}
