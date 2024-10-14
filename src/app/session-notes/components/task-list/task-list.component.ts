import {Component, Input, OnInit} from '@angular/core';
import {TaskCardComponent} from "../task-card/task-card.component";
import {TaskService} from "../../services/task.service";
import {Task} from "../../model/task.entity";
import {NgForOf} from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    TaskCardComponent,
    NgForOf
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{

@Input() tasks!: Task[];


  constructor(private taskService: TaskService,
              private route: ActivatedRoute
              ) { }


  ngOnInit() {
    const sessionId = Number(this.route.snapshot.paramMap.get('appointmentId'));
    this.taskService.getTaskBySessionId(sessionId).subscribe((tasks: Task[]) => {
      console.log("La sesion de  tarea es" + sessionId);
      this.tasks = tasks;
    }, (error) => {
      console.error('Error fetching tasks:', error);
    });
  }

  onTaskCreated(newTask: Task): void {
    this.tasks.push(newTask);
  }

}
