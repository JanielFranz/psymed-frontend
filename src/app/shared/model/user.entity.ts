export class User {

  //#region Attributes
  protected id: number;
  protected userName: string;
  protected password: string;
  protected role: string;

  constructor(id: number = 0, userName: string= '', password: string='', role: string='') {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.role = role;
  }

  //#endregion

  //#region Methods

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
