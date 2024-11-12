import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from "../../model/task.entity";
import { TaskService } from "../../services/task.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    MatButton,
    MatError,
    NgIf,
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  id!: number;
  appointmentId!: number;
  @Output() taskCreated = new EventEmitter<Task>();

  constructor(private fb: FormBuilder,
              private taskService: TaskService,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.appointmentId = +this.route.snapshot.paramMap.get('appointmentId')!;

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    console.log("Patient ID for task creation:", this.id);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      // Get the next available task ID before creating the task
      this.taskService.getNextTaskId().subscribe(nextId => {
        const formValues = this.taskForm.value;
        const newTask = new Task({
          id: nextId,
          idPatient: this.id,
          idSession: this.appointmentId,
          title: formValues.title,
          description: formValues.description,
          status: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        this.taskService.create(newTask).subscribe(response => {
          console.log('Task created successfully', response);
          this.taskCreated.emit(newTask);
        });
      });
    }
  }
}
