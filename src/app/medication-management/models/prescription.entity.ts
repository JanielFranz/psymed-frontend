export class Prescription {
  id: number;
  medications: number[];
  description: string;
  constructor() {
    this.medications = [];
    this.description = '';
    this.id = 0;
  }
}
