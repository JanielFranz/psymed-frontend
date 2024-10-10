import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {SessionNote} from "../model/session-note.entity";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteService extends BaseService<SessionNote>{

  constructor() {
    super();
    this.resourceEndpoint = '/session-notes';
  }

  public findSessionNotesBySessionId(idSession: string): Observable<SessionNote[]> {
    return this.http.get<SessionNote[]>(`${this.resourcePath()}?idSession=${idSession}`, this.httpOptions);
  }
}
