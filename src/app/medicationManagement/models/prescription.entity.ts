import { Medication } from './medication.entity';

export class Prescription {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  patient: string;
  professional: string;
  createdAt: Date;
  updatedAt: Date;
  medications: Medication[];

  constructor(endDate: Date) {
    this.name = '';
    this.description = '';
    this.startDate = new Date();
    this.endDate = endDate;
    this.patient = '';
    this.professional = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.medications = [];
  }
}
