export class SessionNote {
  id: number;
  patientId: string;
  sessionId: string;
  title: string;
  description: string;
  date: string;

  constructor(patientId: string, sessionId:string, title:
    string, description: string, date: string, id?: number) {
    this.id= id || 0;
    this.patientId = patientId;
    this.sessionId = sessionId;
    this.title = title;
    this.description = description;
    this.date = date;
  }
}
