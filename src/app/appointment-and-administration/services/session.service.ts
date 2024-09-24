import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import {Session} from "../model/sesion.entity";

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseService<Session> {

  constructor() {
    super();
    this.resourceEndpoint = '/sessions';
  }
}
