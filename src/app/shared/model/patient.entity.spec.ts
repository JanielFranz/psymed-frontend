import { Patient } from './patient.entity';

describe('PatientEntity', () => {
  it('should create an instance', () => {
    expect(new Patient()).toBeTruthy();
  });
});
