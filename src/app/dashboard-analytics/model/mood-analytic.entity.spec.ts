import { MoodAnalytic } from './mood-analytic.entity';

describe('MoodAnalyticEntity', () => {
  it('should create an instance', () => {
    expect(new MoodAnalytic({idPatient: '1'})).toBeTruthy();
  });
});
