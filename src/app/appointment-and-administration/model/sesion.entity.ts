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
   * @property {number} idNote - ID of the note associated with the session.
   */
  idNote: number;

  /**
   * @property {string} appointmentDate - The date and time of the appointment in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ).
   */
  appointmentDate: string;

  /**
   * @property {number} sessionTime - Duration of the session in minutes.
   */
  sessionTime: number;

  /**
   * @property {string} createdAt - Timestamp when the session was created in ISO 8601 format.
   */
  createdAt: string;

  /**
   * @property {string} updatedAt - Timestamp when the session was last updated in ISO 8601 format.
   */
  updatedAt: string;

  /**
   * @property {object} patient - An object representing the patient involved in the session.
   * @property {number} patient.id - The ID of the patient.
   * @property {string} patient.name - The first name of the patient.
   * @property {string} patient.lastName - The last name of the patient.
   */
  patient: {
    id: number;
    name: string;
    lastName: string;
  };

  //#endregion

  //#region Constructor

  /**
   * Constructor to initialize a session object.
   *
   * @param {Object} [session] - An optional object to initialize the session with specific values.
   * @param {number} [session.id] - Session ID.
   * @param {number} [session.idProfessional] - Professional ID conducting the session.
   * @param {number} [session.idPatient] - Patient ID attending the session. Default is 0.
   * @param {number} [session.idNote] - Note ID linked to the session.
   * @param {string} [session.appointmentDate] - Appointment date in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
   * @param {number} [session.sessionTime] - Duration of the session in minutes.
   * @param {string} [session.createdAt] - Creation timestamp in ISO 8601 format.
   * @param {string} [session.updatedAt] - Last updated timestamp in ISO 8601 format.
   * @param {object} [session.patient] - Patient object containing their information.
   * @param {number} [session.patient.id] - Patient ID.
   * @param {string} [session.patient.name] - Patient's first name.
   * @param {string} [session.patient.lastName] - Patient's last name.
   */
  constructor(session?: {
    id?: number;
    idProfessional?: number;
    idPatient?: number;
    idNote?: number;
    appointmentDate?: string;
    sessionTime?: number;
    createdAt?: string;
    updatedAt?: string;
    patient?: {
      id: number;
      name: string;
      lastName: string;
    }
  }) {
    // Assign values from the session object or use default values.
    this.id = session?.id || 0;
    this.idProfessional = session?.idProfessional || 0;
    this.idPatient = session?.idPatient || 0;
    this.idNote = session?.idNote || 0;
    this.appointmentDate = session?.appointmentDate || '';
    this.sessionTime = session?.sessionTime || 0;
    this.createdAt = session?.createdAt || '';
    this.updatedAt = session?.updatedAt || '';
    this.patient = session?.patient || { id: 0, name: '', lastName: '' };
  }

  //#endregion

}
