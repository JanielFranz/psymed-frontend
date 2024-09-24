export class ClinicalHistory {

  //#region Atributes
  private id: number;
  private background: string;
  private consultationReason: string;
  private symptoms: string;
  private date: string;

  constructor(clinicalHistoryData: { id:number;  consultationReason: string; date?: string; background: string; symptoms: string; }) {
    this.background = clinicalHistoryData.background || '';
    this.consultationReason = clinicalHistoryData.consultationReason || '';
    this.symptoms = clinicalHistoryData.symptoms || '';
    this.date = clinicalHistoryData.date || '';
    this.id = clinicalHistoryData.id || 0;
  }
  //#endregion

  //#region Methods
  //#endregion







}
