export class Session {

  //#region Attributes
  private readonly id: number;
  private readonly appointmentId: number;
  private noteId: number;
  private readonly startTime: Date;
  private duration: number; // in hours
  //#endregion

  //#region Constructor
  constructor(
    id: number = 0,
    appointmentId: number = 0,
    noteId: number = 0,
    startTime: Date = new Date(),
    duration: number = 1
  ) {
    this.id = id;
    this.appointmentId = appointmentId;
    this.noteId = noteId;
    this.startTime = startTime;
    this.duration = duration;
  }
  //#endregion

  //#region Methods

  /**
   * Extends the session by adding extra time.
   * @param extraTime - The additional time in hours
   */
  public extendSession(extraTime: number): void {
    this.duration += extraTime;
  }

  /**
   * Ends the session and performs any required cleanup.
   */
  public endSession(): void {
    // TODO: Implement session ending logic.
  }

  /**
   * Retrieves session details.
   * @returns A string with session details.
   */
  public getSessionDetails(): string {
    return `Session ID: ${this.id} for Appointment ID: ${this.appointmentId} starts at ${this.startTime} and lasts ${this.duration} hour(s).`;
  }
  //#endregion
}
