export class SignInResponse {
  public id: number;
  public role: string;
  public token: string;

  /**
   * Constructor for SignInResponse
   * @param id The id
   * @param role The username
   * @param token The generated token
   */
  constructor(id: number, role: string, token: string) {
    this.id = id;
    this.role = role;
    this.token = token;
  }
}
