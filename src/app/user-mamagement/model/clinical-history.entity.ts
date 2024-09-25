export class ClinicalHistory {
  //#region Atributes
  private id: number;
  private background: string;
  private consultationReason: string;
  private symptoms: string;
  private date: string;

  constructor(clinicalHistoryData?: { id?: number; consultationReason?: string; date?: string; background?: string; symptoms?: string; }) {
    this.id = clinicalHistoryData?.id || 0;
    this.background = clinicalHistoryData?.background || '';
    this.consultationReason = clinicalHistoryData?.consultationReason || '';
    this.symptoms = clinicalHistoryData?.symptoms || '';
    this.date = clinicalHistoryData?.date || '';
  }
  //#endregion

  //#region Methods
  //#endregion
}
