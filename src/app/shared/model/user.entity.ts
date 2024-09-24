export class User {

  //#region Atributes
  id: number;
  name: string;
  lastName: string;
  email: string;
  idAccount: number;


  constructor(id: number = 0, name: string= '', lastName: string= '', email: string='', idAccount = 0) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.idAccount = idAccount;
  }

  //#endregion

  //#region Methods
  public get FullName(): string{
    return `${this.name} ${this.lastName}`;
  }

  public get accessId(): number {
    return this.id;
  }

  public get accessName() {
    return this.name;
  }

  // public logIn(){
  //   // TODO: add log in logic.
  // }
  //
  // public logOut(){
  //   // TODO: add log out logic.
  // }
  //
  // public update(){
  //   // TODO: add update logic.
  // }
  //#endregion
}
