import {User} from "./user.entity";

export class Patient extends User{
  constructor(patient: {
    id: number,
    name: string,
    lastName: string,
    email: string,
    idAccount: string,
    idClinicalHistory: string,
  }) {
    super(patient.id, patient.name, patient.lastName, patient.email, patient.idAccount, patient.idClinicalHistory);

  }
}
