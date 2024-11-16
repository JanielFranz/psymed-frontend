export class SignUpRequest {
  public firstName: string;
  public lastName: string;
  public street: string;
  public city: string;
  public country: string;
  public email: string;
  public username: string;
  public password: string;

  /**
   * Constructor for SignUpRequest
   * @param firstName The first name
   * @param lastName The last name
   * @param street The street
   * @param city The city
   * @param country The country
   * @param email The email
   * @param username The username
   * @param password The password
   */
  constructor(
    firstName: string,
    lastName: string,
    street: string,
    city: string,
    country: string,
    email: string,
    username: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.street = street;
    this.city = city;
    this.country = country;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
