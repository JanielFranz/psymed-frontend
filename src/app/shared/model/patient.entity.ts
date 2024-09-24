import { User } from './user.entity';

export class Patient extends User {
  private idClinicalHistory: number;

  constructor(patient: { id: number, name: string, lastName: string, email: string, idAccount: number, idClinicalHistory: number }) {
    super(patient.id, patient.name, patient.lastName, patient.email, patient.idAccount);
    this.idClinicalHistory = patient.idClinicalHistory;
  }
}
