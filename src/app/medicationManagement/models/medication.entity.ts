export class Medication {
  name: string;
  description: string;
  id: number;
  startDate: Date;
  endDate: Date;
  interval: String;
  quantity: number;

  constructor() {
    this.name = '';
    this.description = '';
    this.id = 0;
    this.startDate = new Date();
    this.endDate = new Date();
    this.interval= '';
    this.quantity = 0;
  }
}
