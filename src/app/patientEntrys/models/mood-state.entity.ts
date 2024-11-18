export class MoodState {
  id: number;
  idPatient: number | null;
  mood: number;

  constructor(id: number, idPatient: number | null, mood: number) {
    this.id = id;
    this.idPatient = idPatient;
    this.mood = mood;
  }
}
