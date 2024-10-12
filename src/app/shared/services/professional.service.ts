import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {ProfessionalEntity} from "../model/professional.entity";

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService extends BaseService <ProfessionalEntity> {

  constructor() {
    super()
    this.resourceEndpoint = '/professionals';
  }
}
