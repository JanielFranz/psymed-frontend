import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NoteService} from "../../services/note.service";
import {SessionNote} from "../../model/session-note.entity";
import {TranslateModule} from "@ngx-translate/core";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf
  ],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css'
})
export class NoteFormComponent {
  @Input() patientId!: string;
  @Input() sessionId!: string;

  @Output() noteAdded = new EventEmitter<SessionNote>();

  noteForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  })

  constructor(private noteService: NoteService) {}

  //#region Utility Methods

  private constructSessionNoteObject(): SessionNote {
    console.log('id data', this.patientId, this.sessionId);
    const title = this.noteForm.value.title?.toString() ?? '';
    const description = this.noteForm.value.description?.toString() ?? '';
    const actualDate = new Date().toISOString();
    return new SessionNote(this.patientId, this.sessionId,
      title, description, actualDate)
  }

  //#endregion
  //#region Service Method

  createNote(): void {
    const note = this.constructSessionNoteObject()
    this.noteService.create(note).subscribe((createdNote: SessionNote) => {
      this.noteAdded.emit(createdNote)
      console.log('Note created successfully');
    })
  }

  //#endregion

  //#region Event Handler

  onSubmit() {
    this.createNote();
  }


  //#endregion
}
