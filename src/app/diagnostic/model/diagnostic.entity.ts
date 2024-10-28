export class Diagnostic {
  id: number;
  name: string;
  description: string;
  idClinicalHistory: number;
  createdAt: string;
  updatedAt: string;

  constructor(diagnosticData: {
    id?: number,
    name?: string,
    description?: string,
    idClinicalHistory?: number,
    createdAt?: string,
    updatedAt?: string
  }) {
    this.id = diagnosticData.id || 0;
    this.name = diagnosticData.name || '';
    this.description = diagnosticData.description || '';
    this.idClinicalHistory = diagnosticData.idClinicalHistory || 0;
    this.createdAt = diagnosticData.createdAt || '';
    this.updatedAt = diagnosticData.updatedAt || '';
  }
}
