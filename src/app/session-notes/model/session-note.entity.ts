export class SessionNote {
  id: string;
  patientId: string;
  title: string;
  description: string;
  date: string;

  constructor(id: string, patientId: string, title: string, description: string, date: string) {
    this.id = id;
    this.patientId = patientId;
    this.title = title;
    this.description = description;
    this.date = date;
  }
}
