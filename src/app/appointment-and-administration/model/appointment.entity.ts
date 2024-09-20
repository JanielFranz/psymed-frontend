export class Appointment {

  //#region Attributes
  private id: number;
  private appointmentDate: Date;
  private sessionTime: number;
  private readonly patientId: number;
  private readonly professionalId: number;
  //#endregion

  //#region Constructor
  constructor(
    id: number = 0,
    appointmentDate: Date = new Date(),
    sessionTime: number = 1,
    patientId: number = 0,
    professionalId: number = 0
  ) {
    this.id = id;
    this.appointmentDate = appointmentDate;
    this.sessionTime = sessionTime;
    this.patientId = patientId;
    this.professionalId = professionalId;
  }
  //#endregion

  //#region Methods

  /**
   * Reschedules the appointment to a new date and time.
   * @param newDate - The new appointment date
   * @param newTime - The new session time (in hours)
   */
  public rescheduleAppointment(newDate: Date, newTime: number): void {
    this.appointmentDate = newDate;
    this.sessionTime = newTime;
  }

  /**
   * Cancels the appointment.
   */
  public cancelAppointment(): void {
    // TODO: Implement cancel logic.
  }

  /**
   * Displays the appointment details.
   * @returns A string containing appointment details.
   */
  public getAppointmentDetails(): string {
    return `Appointment with Professional ID: ${this.professionalId} for Patient ID: ${this.patientId} is scheduled on ${this.appointmentDate} for ${this.sessionTime} hour(s).`;
  }
  //#endregion
}
