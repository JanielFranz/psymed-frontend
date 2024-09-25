export class BiologicalFunctions {
  id: number;
  hunger: number;
  hydration: number;
  sleep: number;
  energy: number;
  createdAt: string;
  updatedAt: string;
  idPatient: number;

  constructor(
    id: number,
    hunger: number,
    hydration: number,
    sleep: number,
    energy: number,
    createdAt: string,
    updatedAt: string,
    idPatient: number
  ) {
    this.id = id;
    this.hunger = hunger;
    this.hydration = hydration;
    this.sleep = sleep;
    this.energy = energy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.idPatient = idPatient;
  }
}
