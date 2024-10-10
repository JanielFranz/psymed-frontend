import {Component, OnInit, ViewChild} from '@angular/core';
import {NoteListComponent} from "../../components/note-list/note-list.component";
import {SessionNote} from "../../model/session-note.entity";
import {ActivatedRoute} from "@angular/router";
import {NoteService} from "../../services/note.service";
import {NoteFormComponent} from "../../components/note-form/note-form.component";

@Component({
  selector: 'app-session-notes',
  standalone: true,
  imports: [
    NoteListComponent,
    NoteFormComponent
  ],
  templateUrl: './session-notes.component.html',
  styleUrl: './session-notes.component.css'
})
export class SessionNotesComponent implements OnInit {
  //#region Attributes
  protected sessionNotes!: Array<SessionNote>
  protected sessionId!: string;
  protected patientId!: string;

  @ViewChild(NoteFormComponent) formComponent!: NoteFormComponent

  constructor(private activatedRouter: ActivatedRoute,
              private noteService: NoteService) {}
  //#endregion

  //#region Service Methods
  private getSessionNotes(): void{
    this.sessionId = this.activatedRouter.snapshot.paramMap.get('appointmentId')!;
    this.patientId = this.activatedRouter.snapshot.paramMap.get('id')!;
    this.noteService.findSessionNotesBySessionId(this.sessionId).subscribe((response: any) => {
      this.sessionNotes = response;
      console.log(response);
      console.log('session notes array', this.sessionNotes);
    })
  }

  protected deleteSessionNoteById(sessionNote: SessionNote): void {
    const noteId = sessionNote.id;
    this.noteService.delete(noteId).subscribe(() => {
      this.sessionNotes = this.sessionNotes.filter((note: SessionNote) =>note.id !== noteId);
    })
  }
  //#endregion

  //#region Lifecycle Hooks
  ngOnInit(): void {
    this.getSessionNotes();

  }
  //#endregion

  //#region Event Handlers

  protected onNoteAdded(note: SessionNote): void{
    console.log('ids to sent', this.sessionId, this.patientId)
    this.sessionNotes.push(note);
  }

  //#endregion
}
