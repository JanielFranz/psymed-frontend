import {Component, Input, OnInit} from '@angular/core';
import {TaskCardComponent} from "../task-card/task-card.component";
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/task.entity";
import {Store} from "@ngrx/store";
import {selectPatientId} from "../../../store/auth/auth.selectors";
import {filter, switchMap} from "rxjs";
import {NgForOf} from "@angular/common";

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


  constructor(private taskService: TaskService, private store: Store) { }


  ngOnInit() {
    this.store.select(selectPatientId).pipe(
      filter((patientId: number | null): patientId is number => patientId !== null),
      switchMap((patientId: number) => this.taskService.getTasksByPatientId(patientId))
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });

  }

}
