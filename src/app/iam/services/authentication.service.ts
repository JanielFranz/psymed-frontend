import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { SignInRequest } from "../models/sign-in.request";
import { SignInResponse } from "../models/sign-in.response";
import { SignUpRequest} from "../models/sign-up.request";
import { SignUpResponse} from "../models/sign-up.response";
import { setJwtToken, setProfileId, setRole } from "../../store/auth/auth.actions";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  basePath: string = `${environment.serverBasePath}`;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private store: Store, private http: HttpClient) {}

  signIn(signInRequest: SignInRequest) {
    return this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions).pipe(
      tap((response: SignInResponse) => {
        const storedRole = localStorage.getItem('role');
        if (storedRole && storedRole !== response.role) {
          throw new Error(`Role mismatch: Stored role is ${storedRole}, but account role is ${response.role}`);
        }

        // Store token, role, and profile ID
        this.storeSessionData(response);
      })
    );
  }
  signUp(signUpRequest: SignUpRequest) {
    return this.http.post<SignUpResponse>(`${this.basePath}/professional-profiles`, signUpRequest, this.httpOptions).pipe(
      tap((response: SignUpResponse) => {
        // Store role and profile ID
        localStorage.setItem('role', response.role);
        localStorage.setItem('profileId', response.id.toString());

        this.store.dispatch(setRole({ rolId: response.role }));
        this.store.dispatch(setProfileId({ profileId: response.id }));
      })
    );
  }

  storeSessionData(response: SignInResponse): void {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('role', response.role);
    localStorage.setItem('profileId', response.id.toString());

    this.store.dispatch(setJwtToken({ jwtToken: response.token }));
    this.store.dispatch(setRole({ rolId: response.role }));
    this.store.dispatch(setProfileId({ profileId: response.id }));
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
    return this.http.post('/api/reset-password', { account, newPassword });
  }

}
