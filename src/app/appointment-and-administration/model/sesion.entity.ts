export class Session {
  id: number;
  idProfessional: number;
  idPatient: number;
  idNote: number;
  appointmentDate: string;
  sessionTime: number;
  createdAt: string;
  updatedAt: string;
  patient: {
    id: number;
    name: string;
    lastName: string;
  };

  constructor(session: {
    id?: number,
    idProfessional?: number,
    idPatient?: number,
    idNote?: number,
    appointmentDate?: string,
    sessionTime?: number,
    createdAt?: string,
    updatedAt?: string,
    patient?: {
      id: number,
      name: string,
      lastName: string
    }
  }) {
    this.id = session.id || 0;
    this.idProfessional = session.idProfessional || 0;
    this.idPatient = session.idPatient || 0;
    this.idNote = session.idNote || 0;
    this.appointmentDate = session.appointmentDate || '';
    this.sessionTime = session.sessionTime || 0;
    this.createdAt = session.createdAt || '';
    this.updatedAt = session.updatedAt || '';
    this.patient = session.patient || { id: 0, name: '', lastName: '' };
  }
}
