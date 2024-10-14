import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task} from "../../model/task.entity";
import { TaskService } from "../../services/task.service";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{
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
    console.log("id de paciente al crear task", this.id);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValues = this.taskForm.value;
      const newTask = new Task({
        id: "666",
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
    }


  }
}
