import { BiologicalAnalytic } from './biological-analytic.entity';

describe('BiologicalAnalytic', () => {
  it('should create an instance', () => {
    expect(new BiologicalAnalytic({idPatient: '1'})).toBeTruthy();
  });
});
