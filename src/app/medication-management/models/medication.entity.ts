export class Medication {
  name: string;
  description: string;
  id: number;
  startDate: Date;
  endDate: Date;
  interval: string;
  quantity: number;
  patientId: number;

  constructor(medicationData: {
    name?: string,
    description?: string,
    id?: number,
    startDate?: Date,
    endDate?: Date,
    interval?: string,
    quantity?: number,
    patientId?: number
  }) {
    this.name = medicationData.name || '';
    this.description = medicationData.description || '';
    this.id = medicationData.id || 0;
    this.startDate = medicationData.startDate || new Date();
    this.endDate = medicationData.endDate || new Date();
    this.interval = medicationData.interval || '';
    this.quantity = medicationData.quantity || 0;
    this.patientId = medicationData.patientId || 0;
  }
}
