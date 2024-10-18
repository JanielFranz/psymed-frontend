export class ClinicalHistory {

  id: number;
  background: string;
  consultationReason: string;
  symptoms: string;
  date: string;

  constructor(historyData: {
    id?: number,
    background?: string,
    consultationReason?: string,
    symptoms?: string,
    date?: string
  }) {
    this.id = historyData.id || 0;
    this.background = historyData.background || '';
    this.consultationReason = historyData.consultationReason || '';
    this.symptoms = historyData.symptoms || '';
    this.date = historyData.date || '';
  }
}

