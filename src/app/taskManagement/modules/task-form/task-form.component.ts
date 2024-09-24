import { Component } from '@angular/core';
import { Task } from '../../models/task.entity';
import { TaskServiceService } from '../../services/task.service.service';
import { OnInit} from "@angular/core";


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {


  ngOnInit() {
    console.log("on init");
  }

}
