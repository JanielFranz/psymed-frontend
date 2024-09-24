export class MoodState {
  id: string;
  idPatient: number;
  mood: number;
  createdAt: string;

  constructor(id: string, idPatient: number, mood: number, createdAt: string) {
    this.id = id;
    this.idPatient = idPatient;
    this.mood = mood;
    this.createdAt = createdAt;
  }
}
