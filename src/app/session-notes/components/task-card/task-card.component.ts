import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../model/task.entity";
import {Store} from "@ngrx/store";
import {selectRolId} from "../../../store/auth/auth.selectors";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  role$!: Observable<string | null>;

  constructor(private store: Store,
    private taskService: TaskService
  ) {
  }


  deleteThisCard(taskId: number): void{
    this.taskService.delete(taskId).subscribe(
      () => {
        console.log(`Task with id ${taskId} deleted successfully`);
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );

  }

  ngOnInit() {
    this.role$ = this.store.select(selectRolId);
    this.role$.subscribe(role => {
      console.log("el rol de task card es " + role);
    });
  }
}
