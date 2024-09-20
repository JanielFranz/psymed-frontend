import { Medication } from './medication.entity';

export class Prescription {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  medications: Medication[];

  constructor(endDate: Date) {
    this.name = '';
    this.description = '';
    this.startDate = new Date();
    this.endDate = endDate;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.medications = [];
  }
}
