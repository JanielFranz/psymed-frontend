import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { SessionNote } from "../model/session-note.entity";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NoteService extends BaseService<SessionNote> {

  constructor() {
    super();
    this.resourceEndpoint = '/session-notes';
  }

  public findSessionNotesBySessionId(idSession: string): Observable<SessionNote[]> {
    return this.http.get<SessionNote[]>(`${this.resourcePath()}?idSession=${idSession}`, this.httpOptions);
  }

  // New method to get the next available ID
  public getNextNoteId(): Observable<string> {
    return this.http.get<SessionNote[]>(this.resourcePath(), this.httpOptions).pipe(
      map((notes: SessionNote[]) => {
        const maxId = notes.reduce((max, note) => Math.max(max, parseInt(String(note.id), 10)), 0);
        return (maxId + 1).toString();
      }),
      catchError((error) => {
        console.error('Error fetching notes:', error);
        return of("1"); // Start from 1 if an error occurs
      })
    );
  }
}
