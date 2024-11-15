export class SignUpRequest {
  public username: string;
  public password: string;
  public role: string;

  /**
   * Constructor for SignUpRequest
   * @param username The username
   * @param password The password
   * @param role The role
   */
  constructor(username: string, password: string, role: string) {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
