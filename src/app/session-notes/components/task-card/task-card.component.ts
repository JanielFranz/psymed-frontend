import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../model/task.entity";
import {Store} from "@ngrx/store";
import {selectRolId} from "../../../store/auth/auth.selectors";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardActions} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSlideToggle, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialog} from "@angular/material/dialog";
import {TaskEditModalComponent} from "../task-edit-modal/task-edit-modal.component";

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    FormsModule,
    TranslateModule,
    MatCardActions,
    MatButton,
    MatIcon,
    MatSlideToggle,
    MatSlideToggleModule
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<string>();
  role$!: Observable<string | null>;

  constructor(private store: Store,
    private taskService: TaskService, private dialog: MatDialog

  ) {
  }


  deleteThisCard(taskId: string): void{
    this.taskService.delete(taskId).subscribe(
      () => {
        console.log(`Task with id ${taskId} deleted successfully`);
        this.taskDeleted.emit(taskId);
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );

  }

  toggleStatus(): void {
    this.taskService.changeTaskStatusById(this.task.id)
  }

  ngOnInit() {
    this.role$ = this.store.select(selectRolId);
    this.role$.subscribe(role => {
      console.log("el rol de task card es " + role);
    });
  }

  openEditModal(task: Task): void {
    const dialogRef = this.dialog.open(TaskEditModalComponent, {
      width: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the task if needed
        Object.assign(this.task, result);
      }
    });
  }

}
