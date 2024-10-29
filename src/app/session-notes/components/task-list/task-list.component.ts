import {Component, Input, OnInit} from '@angular/core';
import {TaskCardComponent} from "../task-card/task-card.component";
import {TaskService} from "../../services/task.service";
import {Task} from "../../model/task.entity";
import {NgForOf} from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {max} from "rxjs";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    TaskCardComponent,
    NgForOf,
    MatPaginator
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{

  @Input() tasks: Task[] = new Array<Task>();
  sessionId : number = 0;

  index : number = 0;
  pageSize : number = 2;
  length: number = 0;

  oldIndex = 0;


  constructor(private taskService: TaskService,
              private route: ActivatedRoute
              ) {
  }


  ngOnInit() {
    const sessionId = Number(this.route.snapshot.paramMap.get('appointmentId'));
    this.sessionId = sessionId;

    this.taskService.getTaskBySessionId(sessionId).subscribe((tasks: Task[]) => {
      console.log("La sesion de tarea es" + sessionId);
      console.log(tasks.length)

      this.length = tasks.length;

      for (let id = 0; id < this.pageSize; id++) {

        if (tasks[id] == null){
          break;
        }
        this.tasks.push(tasks[id]);
      }

    }, (error) => {
      console.error('Error fetching tasks:', error);
    });
  }

  onTaskCreated(newTask: Task): void {

    this.length++;

    if (this.length > this.pageSize * (this.oldIndex + 1)){
      return;
    }

    this.tasks.push(newTask);
  }

  onPage(event : PageEvent) : void{
    this.tasks = [];
    this.oldIndex = event.pageIndex - 1;

    this.paginate((event.pageIndex))
  }

  onTaskDeleted(taskId: string): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);

    if (this.oldIndex < 0){
      return;
    }

    if (this.tasks.length == 0){
      this.paginate(this.oldIndex);
    }
  }

  private paginate(index : number) {

    let actualIndex = (index * this.pageSize);
    let maxValuePage = (index + 1) * this.pageSize;

    console.log("actualindex " + actualIndex + " maxvaluepage" +  maxValuePage)

    console.log("index: " + this.index)
    this.taskService.getTaskBySessionId(this.sessionId).subscribe((tasks: Task[]) => {
      console.log("La sesion de tarea es" + this.sessionId);


      for (let id = actualIndex; id < maxValuePage; id++) {

        if (tasks[id] == null){
          break;
        }

        this.tasks.push(tasks[id]);
      }

    }, (error) => {
      console.error('Error fetching tasks:', error);
    });
  }

}
