import { Component } from '@angular/core';
import {NoteListComponent} from "../../components/note-list/note-list.component";

@Component({
  selector: 'app-session-notes',
  standalone: true,
  imports: [
    NoteListComponent
  ],
  templateUrl: './session-notes.component.html',
  styleUrl: './session-notes.component.css'
})
export class SessionNotesComponent {

}
