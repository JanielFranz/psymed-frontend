import { Patient } from './patient.entity';

describe('PatientEntity', () => {
  it('should create an instance', () => {
    const patientData = {
      id: 1,
      name: 'Callapin',
      lastName: 'bombin',
      email: 'callampa.mal@example.com',
      idAccount: 123,
      idClinicalHistory: 456
    };
    expect(new Patient(patientData)).toBeTruthy();
  });
});
