export class ClinicalHistory {

  //#region Atributes
  private background: string;
  private consoultationReason: string;
  private symptoms: string;
  private date: Date;

  constructor(background: string = '', consultationReason: string= '', symptoms: string= '', date: Date= new Date())  {
    this.background = background;
    this.consoultationReason = consultationReason;
    this.symptoms = symptoms;
    this.date = date;
  }
  //#endregion

  //#region Methods
  //#endregion



}
