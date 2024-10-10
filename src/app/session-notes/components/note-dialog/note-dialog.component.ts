import {Component, EventEmitter, inject, Output} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.css'
})
export class NoteDialogComponent {
  //#region Attributes
  @Output() deleteNoteRequested = new EventEmitter<void>();
  readonly dialogRef = inject(MatDialogRef<NoteDialogComponent>)
  //#endregion

  //#region Event Handlers
  onDeleteConfirmed() {
    this.deleteNoteRequested.emit();
    this.dialogRef.close();
  }
  //#endregion

}
