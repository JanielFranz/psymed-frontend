import {User} from "./user.entity";

export class Patient extends User{

  private name: string;
  private lastName: string;
  private email: string;
  private idAccount?: string;
  private idClinicalHistory: string;

  constructor(patient: {
    id: number;
    userName: string;
    password: string;
    role: string;
    name: string;
    lastName: string;
    email: string;
    idAccount?: string;
    idClinicalHistory: string
  }) {

    super(patient.id, patient.userName, patient.password, patient.role);
    this.name = patient.name;
    this.lastName = patient.lastName;
    this.email = patient.email;
    this.idAccount = patient.idAccount;
    this.idClinicalHistory = patient.idClinicalHistory;
  }
}
