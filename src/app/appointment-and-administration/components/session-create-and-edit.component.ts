import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Session } from "../model/sesion.entity";

@Component({
  selector: 'app-session-create-and-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './session-create-and-edit.component.html',
  styleUrls: ['./session-create-and-edit.component.css']
})
export class SessionCreateAndEditComponent {
  //#region Attributes

  @Input() session!: Session;
  @Input() editMode: boolean = false;
  @Output() protected sessionAddRequested = new EventEmitter<Session>();
  @Output() protected sessionUpdateRequested = new EventEmitter<Session>();
  @Output() protected cancelRequested = new EventEmitter<void>();
  @ViewChild('sessionForm', { static: false }) protected sessionForm!: NgForm;

  //#endregion Attributes

  //#region Methods

  constructor() {
    this.session = new Session({
      patient: {
        id: 0,
        name: '',
        lastName: ''
      }
    });
  }

  private resetEditState() {
    this.session = new Session({
      patient: {
        id: 0,
        name: '',
        lastName: ''
      }
    });
    this.editMode = false;
    this.sessionForm.reset();
  }

  private isValid = () => this.sessionForm.valid;

  protected isEditMode = (): boolean => this.editMode;

  // Event Handlers

  protected onSubmit() {
    if (this.isValid()) {
      let emitter = this.isEditMode() ? this.sessionUpdateRequested : this.sessionAddRequested;
      emitter.emit(this.session);
      this.resetEditState();
    } else {
      console.error('Invalid form data');
    }
  }

  protected onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }

  //#endregion Methods
}
