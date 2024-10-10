import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SessionNote} from "../../model/session-note.entity";
import {NoteCardComponent} from "../note-card/note-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    NoteCardComponent,
    NgForOf
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent {
  @Input() sessionNotes!: Array<SessionNote>;
  @Output() deleteNoteRequested = new EventEmitter<SessionNote>();

  onDeleteNoteRequested(sessionNote: SessionNote) {
    this.deleteNoteRequested.emit(sessionNote);
    console.log('delete event emitted from the list');
  }
}
