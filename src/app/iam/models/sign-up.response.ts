export class SignUpResponse {
  public id: number;
  public username: string;
  public role: string;

  /**
   * Constructor for SigUpResponse
   * @param id The id
   * @param username The username
   * @param role The role
   */
  constructor(id: number, username: string, role: string) {
    this.id = id;
    this.username = username;
    this.role = role;
  }
}
