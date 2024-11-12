export class SessionNote {
  id: string | number;
  patientId: string;
  sessionId: string;
  title: string;
  description: string;
  date: string;

  constructor(patientId: string, sessionId: string, title: string, description: string, date: string, id?: string | number) {
    this.patientId = patientId;
    this.sessionId = sessionId;
    this.title = title;
    this.description = description;
    this.date = date;
    this.id = id || 0; // Default to 0 if not provided
  }
}
