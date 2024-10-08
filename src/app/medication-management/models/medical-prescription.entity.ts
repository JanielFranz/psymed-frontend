export class MedicalPrescription {
  id: number;
  patientId: number;
  professionalId: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  prescription: number[]

  constructor() {
    this.patientId = 0;
    this.professionalId = 0;
    this.id = 0;
    this.name = '';
    this.description = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.prescription = [];
  }
}
