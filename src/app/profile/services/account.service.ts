import { Injectable } from "@angular/core";
import { Profile } from "../models/profile.entity";
import { BaseService } from '../../shared/services/base.service';
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<Profile> {

  constructor() {
    super();
    this.resourceEndpoint = '/accounts'; // The endpoint for user accounts
  }

  /**
   * @description Creates a new account
   * @param {Profile} account - The account data to be created
   * @returns {Observable<Profile>} An observable with the created account
   */
  public createAccount(account: Profile): Observable<Profile> {
    console.log("Creating account...");
    return this.create(account);
  }

  /**
   * @description Fetches an account by its ID
   * @param {number} accountId - The ID of the account
   * @returns {Observable<Profile>} An observable with the account details
   */
  public getAccountById(accountId: number): Observable<Profile> {
    console.log(`Fetching account for accountId: ${accountId}...`);
    const url = `${this.resourcePath()}/${accountId}`;
    return this.http.get<Profile>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * @description Logs in a user with their username and password
   * @param {string} userName - The username of the account
   * @param {string} password - The password of the account
   * @returns {Observable<Profile>} An observable with the logged-in account
   */
  public logIn(userName: string, password: string): Observable<Profile> {
    console.log("Logging in...");
    const url = `${this.resourcePath()}/login`;
    return this.http.post<Profile>(url, { userName, password }, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * @description Fetches accounts by role (e.g., mental health professional or patient)
   * @param {number} role - The role of the accounts to fetch (1: professional, 2: patient)
   * @returns {Observable<Profile[]>} An observable with the list of accounts
   */
  public getAccountsByRole(role: number): Observable<Profile[]> {
    console.log(`Fetching accounts with role: ${role}...`);
    const url = `${this.resourcePath()}?role=${role}`;
    return this.http.get<Profile[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * @description Logs out the current user by clearing session or token data
   */
  public logOut(): void {
    console.log("Logging out...");
    localStorage.removeItem('token');
  }

  /**
   * @description Checks if the user is logged in by verifying the token
   * @returns {boolean} Returns true if the user is logged in
   */
  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  // Example for AccountService
  getAccountByProfessionalId(professionalId: number): Observable<Profile> {
    return this.http.get<Profile>(`/api/professional/${professionalId}`);
  }

  getAccountByPatientId(patientId: number): Observable<Profile> {
    return this.http.get<Profile>(`/api/patient/${patientId}`);
  }
}
