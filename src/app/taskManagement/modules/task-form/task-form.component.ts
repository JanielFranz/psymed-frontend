import { Component } from '@angular/core';
import { Task } from '../../models/task.entity';
import { TaskServiceService } from '../../services/task.service.service';
import { OnInit} from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {

  constructor(
    private taskService: TaskServiceService,
    private route: ActivatedRoute
  ) {
  }


  ngOnInit() {
    console.log("on init");
  }

}
