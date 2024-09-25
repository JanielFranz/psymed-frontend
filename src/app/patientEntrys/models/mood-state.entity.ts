export class MoodState {
  id: number;
  idPatient: number;
  mood: number;
  createdAt: string;

  constructor(id: number, idPatient: number, mood: number, createdAt: string) {
    this.id = id;
    this.idPatient = idPatient;
    this.mood = mood;
    this.createdAt = createdAt;
  }
}
