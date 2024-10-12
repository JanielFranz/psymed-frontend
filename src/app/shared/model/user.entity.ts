export class User {

  //#region Attributes

  /**
   * The unique identifier for the user.
   */
  id: number;

  /**
   * The first name of the user.
   */
  name: string;

  /**
   * The last name of the user.
   */
  lastName: string;

  /**
   * The email address of the user.
   */
  email: string;

  /**
   * The associated account ID for the user.
   */
  idAccount: number;

  /**
   * The user's national identity document number (DNI).
   */
  dni: string;

  /**
   * The user's phone number.
   */
  phone: string;

  /**
   * A brief description about the user.
   */
  description: string;

  /**
   * The user's address.
   */
  address: string;

  /**
   * The user's profile image URL.
   */
  image: string;

  /**
   * Constructor to initialize a new User object.
   *
   * @param id - The unique identifier for the user.
   * @param name - The first name of the user.
   * @param lastName - The last name of the user.
   * @param email - The email address of the user.
   * @param idAccount - The associated account ID.
   * @param dni - The national identity document number (optional).
   * @param phone - The user's phone number (optional).
   * @param description - A brief description about the user (optional).
   * @param address - The user's address (optional).
   * @param image - The user's profile image URL (optional).
   */
  constructor(
    id: number = 0,
    name: string = '',
    lastName: string = '',
    email: string = '',
    idAccount: number = 0,
    dni: string = '',
    phone: string = '',
    description: string = '',
    address: string = '',
    image: string = '' // Added image attribute
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.idAccount = idAccount;
    this.dni = dni;
    this.phone = phone;
    this.description = description;
    this.address = address;
    this.image = image; // Initialize image
  }

  //#endregion

  //#region Methods

  /**
   * Gets the full name of the user.
   *
   * @returns A string containing the user's first name and last name.
   */
  public get FullName(): string {
    return `${this.name} ${this.lastName}`;
  }

  /**
   * Gets the access ID for the user.
   *
   * @returns The user's ID.
   */
  public get accessId(): number {
    return this.id;
  }

  /**
   * Gets the first name of the user.
   *
   * @returns The user's first name.
   */
  public get accessName(): string {
    return this.name;
  }

  // Uncomment and implement the following methods as needed:

  // /**
  //  * Logs the user into the system.
  //  *
  //  * TODO: Implement logIn logic.
  //  */
  // public logIn() {
  //   // TODO: add log in logic.
  // }

  // /**
  //  * Logs the user out of the system.
  //  *
  //  * TODO: Implement logOut logic.
  //  */
  // public logOut() {
  //   // TODO: add log out logic.
  // }

  // /**
  //  * Updates the user information.
  //  *
  //  * TODO: Implement update logic.
  //  */
  // public update() {
  //   // TODO: add update logic.
  // }

  //#endregion
}
