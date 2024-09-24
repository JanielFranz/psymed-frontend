export class ClinicalHistory {

  //#region Atributes
  private background: string;
  private consultationReason: string;
  private symptoms: string;
  private date: null;

  constructor(clinicalHistoryData: { consultationReason: string; date?: undefined; background: any; symptoms: string; }) {
    this.background = clinicalHistoryData.background || '';
    this.consultationReason = clinicalHistoryData.consultationReason || '';
    this.symptoms = clinicalHistoryData.symptoms || '';
    this.date = clinicalHistoryData.date || null;
  }
  //#endregion

  //#region Methods
  //#endregion







}
