
export class Medication {
  name: string;
  description: string;
  quantity: number;
  medicalPrescription: string;
  prescription: string;

  constructor() {
    this.name = '';
    this.description = '';
    this.quantity = 0;
    this.medicalPrescription = '';
    this.prescription = '';
  }
}
