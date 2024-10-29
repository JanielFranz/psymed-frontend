import {Component, OnInit, ViewChild} from '@angular/core';
import {NoteListComponent} from "../../components/note-list/note-list.component";
import {SessionNote} from "../../model/session-note.entity";
import {ActivatedRoute} from "@angular/router";
import {NoteService} from "../../services/note.service";
import {NoteFormComponent} from "../../components/note-form/note-form.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Task} from "../../model/task.entity";
import {Session} from "../../../appointment-and-administration/model/sesion.entity";

@Component({
  selector: 'app-session-notes',
  standalone: true,
  imports: [
    NoteListComponent,
    NoteFormComponent,
    MatPaginator
  ],
  templateUrl: './session-notes.component.html',
  styleUrl: './session-notes.component.css'
})
export class SessionNotesComponent implements OnInit {
  //#region Attributes
  protected sessionNotes: Array<SessionNote> = [];
  protected tempSessionNotes: Array<SessionNote> = [];

  protected sessionId!: string;
  protected patientId!: string;

  @ViewChild(NoteFormComponent) formComponent!: NoteFormComponent

  index : number = 0;
  pageSize : number = 2;
  length: number = 0;

  oldIndex = 0;

  constructor(private activatedRouter: ActivatedRoute,
              private noteService: NoteService) {}
  //#endregion

  //#region Service Methods
  private getSessionNotes(): void{
    this.sessionId = this.activatedRouter.snapshot.paramMap.get('appointmentId')!;
    this.patientId = this.activatedRouter.snapshot.paramMap.get('id')!;

    this.noteService.findSessionNotesBySessionId(this.sessionId).subscribe((response: any) => {

      this.tempSessionNotes = response;
      this.length = this.tempSessionNotes.length;
      console.log("len: " + this.length)

      for (let id = 0; id < this.pageSize; id++) {

        if (this.tempSessionNotes[id] == null){
          break
        }

        this.sessionNotes.push(this.tempSessionNotes[id]);
      }

      console.log(response);
      console.log('session notes array', this.tempSessionNotes);
    })
  }

  protected deleteSessionNoteById(sessionNote: SessionNote): void {
    const noteId = sessionNote.id;
    this.noteService.delete(noteId).subscribe(() => {

      console.log(this.oldIndex)
      if (this.oldIndex < 0){
        return;
      }

      if (this.sessionNotes.length == 0){
        this.paginate(this.oldIndex);
      }
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
    console.log('ids to sent', this.sessionId, this.patientId);

    this.length++;

    if (this.length > this.pageSize * (this.oldIndex + 1)){
      return;
    }

    this.sessionNotes.push(note);
  }

  //#endregion

  onPage(event : PageEvent) : void{
    this.sessionNotes = [];
    this.oldIndex = event.pageIndex - 1;

    this.paginate((event.pageIndex))
  }

  private paginate(index : number) {

    let actualIndex = (index * this.pageSize);
    let maxValuePage = (index + 1) * this.pageSize;

    console.log("actualindex " + actualIndex + " maxvaluepage" +  maxValuePage)
    console.log("index: " + this.index)

    this.noteService.findSessionNotesBySessionId(this.sessionId).subscribe((response) => {
      console.log("La sesion de tarea es" + this.sessionId);

      this.tempSessionNotes = response;

      for (let id = actualIndex; id < maxValuePage; id++) {

        if (this.tempSessionNotes[id] == null){
          break;
        }

        this.sessionNotes.push(this.tempSessionNotes[id]);
      }

      console.log(response)
    }, (error) => {
      console.error('Error fetching tasks:', error);
    });
  }

}
