export class MoodAnalytic {
  year: string;
  month: string;
  sadMood: string;
  happyMood: string;
  neutralMood: string;
  soSadMood: string;
  soHappyMood: string;

  constructor(moodAnalytic: {year: string, month: string,
  sadMood?: string, happyMood?: string, neutralMood?: string,
  soSadMood?: string, soHappyMood?: string}) {
    this.year = moodAnalytic.year;
    this.month = moodAnalytic.month;
    this.sadMood = moodAnalytic.sadMood || '0';
    this.happyMood = moodAnalytic.happyMood || '0';
    this.neutralMood = moodAnalytic.neutralMood || '0';
    this.soSadMood = moodAnalytic.soSadMood || '0';
    this.soHappyMood = moodAnalytic.soHappyMood || '0';
  }
}
