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
import { CacheService } from 'src/app/Common/cache.service';
import { transformError } from 'src/app/Common/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {
  private readonly authProvider: (
    email: string,
    password: string
  ) => Observable<IserverAuthResponse>;

  authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || DEFAULT_AUTH_STATUS);

  constructor(private httpClient: HttpClient) {
    super();
    this.authStatus.subscribe(authStatus => this.setItem('authStatus', authStatus));
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


    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IserverAuthResponse;


    return of(authResponse);
  }

  login(email: string, password: string): Observable<IAuthStatus> {

    this.logout();

    const loginResponse = this.authProvider(email, password).pipe(
      map(value => {
        this.setToken(value.accessToken);

        console.log('decoded token', decode(value.accessToken) );
        return decode( value.accessToken ) as IAuthStatus;
      }),
      catchError(transformError)
    );

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
    this.clearToken();
    this.authStatus.next(DEFAULT_AUTH_STATUS);
  }

  private setToken( jwt: string ) {
    this.setItem('jwt', jwt);
  }
  private getDecodedToken(): IAuthStatus {
    return decode(this.getItem('jwt'));
  }
  getToken(): string {
    return this.getItem('jwt') || '';
  }
  private clearToken() {
    this.removeItem('jwt');
  }
}
