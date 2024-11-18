export class BiologicalFunctions {
  id: number;
  hunger: number;
  hydration: number;
  sleep: number;
  energy: number;
  idPatient: number;

  constructor(
    id: number,
    hunger: number,
    hydration: number,
    sleep: number,
    energy: number,
    idPatient: number
  ) {
    this.id = id;
    this.hunger = hunger;
    this.hydration = hydration;
    this.sleep = sleep;
    this.energy = energy;
    this.idPatient = idPatient;
  }
}
