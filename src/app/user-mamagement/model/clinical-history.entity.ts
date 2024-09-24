export class ClinicalHistory {

  //#region Atributes
  private background: string;
  private consultationReason: string;
  private symptoms: string;
  private date: Date;

  constructor(clinicalHistoryData: {
    background: string;
    consultationReason: string;
    symptoms?: string;
    date: Date;
  }){
    this.background = clinicalHistoryData.background || '';
    this.consultationReason = clinicalHistoryData.consultationReason || '';
    this.symptoms = clinicalHistoryData.symptoms || '';
    this.date = clinicalHistoryData.date || null;
  }
  //#endregion

  //#region Methods
  //#endregion







}
