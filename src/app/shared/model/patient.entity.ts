import {User} from "./user.entity";

export class Patient extends User {
  private idClinicalHistory: number;

  constructor(id: number, name: string,
              lastName: string, email:string,
              idAccount: number, idClinicalHistory : number) {
    super(id, name, lastName, email, idAccount);
    this.idClinicalHistory = idClinicalHistory;
  }
}
