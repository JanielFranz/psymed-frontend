import {Component, Input, OnInit} from '@angular/core';
import { Task} from "../../models/task.entity";
import {Store} from "@ngrx/store";
import {selectRolId} from "../../../store/auth/auth.selectors";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

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

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.role$ = this.store.select(selectRolId);
    this.role$.subscribe(role => {
      console.log("el rol de task card es " + role);
    });
  }
}
