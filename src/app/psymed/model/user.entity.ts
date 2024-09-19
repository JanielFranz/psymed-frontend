export class User {

  //#region Atributes
  protected id: number;
  protected name: string;
  protected lastName: string;
  protected email: string;
  protected password: string;
  protected birthDate: string;

  constructor(id: number = 0, name: string= '', lastName: string= '', email: string='', password: string='', birthDate: string='') {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.birthDate = birthDate;
  }

  //#endregion

  //#region Methods
  public getFullName(): string{
    return `${this.name} ${this.lastName}`;
  }

  public logIn(){
    // TODO: add log in logic.
  }

  public logOut(){
    // TODO: add log out logic.
  }

  public update(){
    // TODO: add update logic.
  }
  //#endregion
}
