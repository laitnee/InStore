import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { sign } from 'fake-jwt-sign';
import * as decode from 'jwt-decode';

import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError as observableThrowError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Role } from '../models/role.enum';
import { IserverAuthResponse, IAuthStatus } from './IAuthService';
import { DEFAULT_AUTH_STATUS, EMAIL_ERROR_MESSAGE } from './authConstants';
import { transformError } from 'src/app/common/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authProvider: (
    email: string,
    password: string
  ) => Observable<IserverAuthResponse>;

  authStatus = new BehaviorSubject<IAuthStatus>(DEFAULT_AUTH_STATUS);

  constructor(private httpClient: HttpClient) {
    console.log(this.authProvider);
    this.authProvider = this.fakeAuthprovider;
  }

  private fakeAuthprovider(email: string, password: string): Observable<IserverAuthResponse> {

    if (!email.toLowerCase().endsWith('@test.com')) {
      return observableThrowError(EMAIL_ERROR_MESSAGE);
    }

    const authStatus = {
      isAuthenticated: true,
      userId: 'e3icdje3',
      userRole: email.toLowerCase().includes('cashier') ?
        Role.Cashier : email.toLowerCase().includes('clerk') ?
          Role.Clerk :  email.toLowerCase().includes('manager') ?
            Role.Manager : Role.None,
    } as IAuthStatus;

    console.log('auth status in fake auth provider', authStatus);

    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IserverAuthResponse;

    console.log('auth response in fake auth provider ', authResponse);
    return of(authResponse);
  }

  login(email: string, password: string): Observable<IAuthStatus> {
    this.logout();

    const loginResponse = this.authProvider(email, password).pipe(
      map(value => decode(value.accessToken) as IAuthStatus ),
      catchError(transformError)
    );

    console.log('login response decoded', loginResponse);

    loginResponse.subscribe(
      res => {
        this.authStatus.next(res);
      },
      err => {
        this.logout();
        return observableThrowError(err);
      }
    );

    return loginResponse;
  }


  logout(): any {

  }
}
