export class Profile {

  //#region Attributes

  /**
   * @description Unique identifier for the account
   * @type {number}
   */
  id: number;

  /**
   * @description Username for the account, used for login
   * @type {string}
   */
  userName: string;

  /**
   * @description Password for the account, stored securely (ideally hashed in production)
   * @type {string}
   */
  password: string;

  /**
   * @description Role of the user:
   * 1: Mental Health Professional
   * 2: Patient
   * @type {number}
   */
  role: number;

  //#endregion

  //#region Constructor

  /**
   * @description Constructor to initialize the Account entity
   * @param {number} [id=0] - Unique identifier for the account
   * @param {string} [userName=''] - Username for the account
   * @param {string} [password=''] - Password for the account
   * @param {number} [role=0] - Role of the account (1: Mental Health Professional, 2: Patient)
   */
  constructor(id: number = 0, userName: string = '', password: string = '', role: number = 0) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.role = role;
  }

  //#endregion

  //#region Methods

  /**
   * @description Check if the account belongs to a Mental Health Professional (role 1)
   * @returns {boolean} Returns true if the account belongs to a professional
   */
  public isProfessional(): boolean {
    return this.role === 1;
  }

  /**
   * @description Check if the account belongs to a Patient (role 2)
   * @returns {boolean} Returns true if the account belongs to a patient
   */
  public isPatient(): boolean {
    return this.role === 2;
  }

  /**
   * @description Get the username of the account
   * @returns {string} Returns the username of the account
   */
  public getUserName(): string {
    return this.userName;
  }

  /**
   * @description Change the password of the account
   * @param {string} newPassword - The new password to be set
   */
  public changePassword(newPassword: string): void {
    this.password = newPassword;
  }

  /**
   * @description Validate the account password
   * @param {string} password - The password to validate
   * @returns {boolean} Returns true if the password is correct
   */
  public validatePassword(password: string): boolean {
    // In real applications, this would involve comparing hashed passwords
    return this.password === password;
  }

  //#endregion
}
