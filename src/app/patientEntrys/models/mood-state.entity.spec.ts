import { MoodState } from './mood-state.entity';

describe('MoodState', () => {
  it('should create an instance', () => {
    expect(new MoodState('1', 1, 1, '2021-06-01')).toBeTruthy();
  });
});
