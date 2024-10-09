import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import {Session} from "../model/sesion.entity";

/**
 * SessionService to manage API calls related to session entities.
 * This service extends the BaseService to inherit common functionality for resource management.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseService<Session> {

  //#region Constructor

  /**
   * Constructor for the SessionService.
   * Initializes the service by setting the resource endpoint to '/sessions'.
   * This endpoint is used to perform CRUD operations on session data.
   */
  constructor() {
    super();
    // Set the endpoint for session-related API requests
    this.resourceEndpoint = '/sessions';
  }

  //#endregion
}
