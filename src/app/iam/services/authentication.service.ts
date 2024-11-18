import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { SignInRequest } from "../models/sign-in.request";
import { SignInResponse } from "../models/sign-in.response";
import { SignUpRequest } from "../models/sign-up.request";
import { SignUpResponse } from "../models/sign-up.response";
import { setJwtToken, setProfileId, setRole } from "../../store/auth/auth.actions";
import { tap } from "rxjs/operators";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  basePath: string = `${environment.serverBasePath}`;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    private store: Store,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  signIn(signInRequest: SignInRequest) {
    return this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions).pipe(
      tap((response: SignInResponse) => {
        const storedRole = localStorage.getItem('role');
        if (storedRole && storedRole !== response.role) {
          throw new Error(`Role mismatch: Stored role is ${storedRole}, but account role is ${response.role}`);
        }
        console.log("Token for sign-in:", response.token);

        // Store session data
        this.storeSessionData(response);
      })
    );
  }

  signUp(signUpRequest: SignUpRequest, role: string) {
    const endpoint =
      role === 'ROLE_PROFESSIONAL'
        ? `${this.basePath}/professional-profiles`
        : `${this.basePath}/patient-profiles`;

    return this.http.post<SignUpResponse>(endpoint, signUpRequest, this.httpOptions).pipe(
      tap((response: SignUpResponse) => {
        localStorage.setItem('role', response.role);
        localStorage.setItem('profileId', response.id.toString());

        // Dispatch to store
        this.store.dispatch(setRole({ rolId: response.role }));
        this.store.dispatch(setProfileId({ profileId: response.id }));
      })
    );
  }

  getProfileId(accountId: number, authToken: string, role: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      })
    };

    const endpoint =
      role === 'ROLE_PROFESSIONAL'
        ? `${this.basePath}/professional-profiles/account/${accountId}`
        : `${this.basePath}/patient-profiles/account/${accountId}`;

    return this.http.get<{ id: number }>(endpoint, httpOptions).pipe(
      map(response => response.id.toString())
    );
  }

  storeSessionData(response: SignInResponse): void {
    localStorage.setItem('authToken', response.token);
    this.store.dispatch(setJwtToken({ jwtToken: response.token }));

    const role = this.route.snapshot.queryParamMap.get('role') || response.role;
    console.log("Role from sign-in:", role);

    this.getProfileId(response.id, response.token, role).subscribe(profileId => {
      localStorage.setItem('role', response.role);
      localStorage.setItem('profileId', profileId);

      this.store.dispatch(setRole({ rolId: response.role }));
      this.store.dispatch(setProfileId({ profileId: Number(profileId) }));
    });
  }

  signOut(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('profileId');
    this.store.dispatch(setJwtToken({ jwtToken: null }));
    this.store.dispatch(setRole({ rolId: null }));
    this.store.dispatch(setProfileId({ profileId: null }));
  }

  resetPassword(account: string, newPassword: string) {
    return this.http.post(`${this.basePath}/api/reset-password`, { account, newPassword });
  }
}
