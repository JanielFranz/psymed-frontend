export class Session {
  //#region Attributes
  private readonly id: number;
  private appointmentDate: Date;
  private sessionTime: number;
  private readonly patientId: number;
  private readonly professionalId: number;
  private readonly noteId: number;
  private createdAt: Date;
  private updatedAt: Date;
  //#endregion

  //#region Constructor
  constructor(
    id: number = 0,
    appointmentDate: Date = new Date(),
    sessionTime: number = 0,
    patientId: number = 0,
    professionalId: number = 0,
    noteId: number = 0,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.appointmentDate = appointmentDate;
    this.sessionTime = sessionTime;
    this.patientId = patientId;
    this.professionalId = professionalId;
    this.noteId = noteId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  //#endregion

  //#region Methods
  /**
   * Get session details.
   * @returns {string} - A string with session details.
   */
  public getSessionDetails(): string {
    return `Session ID: ${this.id}, Appointment Date: ${this.appointmentDate.toISOString()}, Session Time: ${this.sessionTime} hours, Patient ID: ${this.patientId}, Professional ID: ${this.professionalId}, Note ID: ${this.noteId}.`;
  }

  /**
   * Update the session details.
   * @param appointmentDate - New appointment date.
   * @param sessionTime - New session time in hours.
   */
  public updateSession(appointmentDate: Date, sessionTime: number): void {
    this.appointmentDate = appointmentDate;
    this.sessionTime = sessionTime;
    this.updatedAt = new Date();
  }
  //#endregion
}
