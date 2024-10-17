import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SessionNote} from "../../model/session-note.entity";
import {NoteDialogComponent} from "../note-dialog/note-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [MatDialogModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatButton, TranslateModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {
  //#region Properties
  @Input() sessionNote!: SessionNote;
  @Output() deleteNoteRequested = new EventEmitter<SessionNote>();
  constructor(private dialog: MatDialog) {}
  //#endregion

  //#region Utility Methods

  openDialog(): void {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '250px',
    })

    dialogRef.componentInstance.deleteNoteRequested.subscribe(() => {
      this.onDelete();
    })

  }

  //#endregion

  //#region Event Handlers
  protected onCancel() {
    this.dialog.closeAll();
  }

  protected onDelete() {
    this.deleteNoteRequested.emit(this.sessionNote)
    console.log('event emmitted by the card')
  }
  //#endregion
}
