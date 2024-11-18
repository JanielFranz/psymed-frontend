/**
 * Class representing a Session.
 * This class encapsulates information about a session between a professional and a patient.
 */
export class Session {

  //#region Attributes

  /**
   * @property {number} id - Unique identifier for the session.
   */
  id: number;

  /**
   * @property {number} idProfessional - ID of the professional conducting the session.
   */
  idProfessional: number;

  /**
   * @property {number} idPatient - ID of the patient attending the session. Default is 0 if not provided.
   */
  idPatient: number;

  /**
   * @property {string} appointmentDate - The date and time of the appointment in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ).
   */
  appointmentDate: string;

  /**
   * @property {number} sessionTime - Duration of the session in hours.
   */
  sessionTime: number;

  //#endregion

  //#region Constructor

  /**
   * Constructor to initialize a session object.
   *
   * @param {Object} [session] - An optional object to initialize the session with specific values.
   * @param {number} [session.id] - Session ID.
   * @param {number} [session.idProfessional] - Professional ID conducting the session.
   * @param {number} [session.idPatient] - Patient ID attending the session. Default is 0.
   * @param {string} [session.appointmentDate] - Appointment date in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
   * @param {number} [session.sessionTime] - Duration of the session in hours.
   */
  constructor(session?: {
    id?: number;
    idProfessional?: number;
    idPatient?: number;
    appointmentDate?: string;
    sessionTime?: number;
  }) {
    // Assign values from the session object or use default values.
    this.id = session?.id || 0;
    this.idProfessional = session?.idProfessional || 0;
    this.idPatient = session?.idPatient || 0;
    this.appointmentDate = session?.appointmentDate || '';
    this.sessionTime = session?.sessionTime || 0;
  }

  //#endregion

}
