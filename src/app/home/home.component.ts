import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <div *ngIf="displayLogin">
        <app-login></app-login>
      </div>
      <div *ngIf="!displayLogin">
        <span class="mat-display-3">
          Free item for everybody yay!!
        </span>
      </div>
    </div>
  `,
  styles: [
    `
    div[fxLayout] { margin-top: 32 px;}
    `
  ]
})
export class HomeComponent implements OnInit {
  private _displayLogin = true;

  constructor(private authService: AuthService) {

   }

  ngOnInit() {
    this.authService.authStatus.subscribe(
      authStatus => (this._displayLogin = !authStatus.isAuthenticated)
    );
  }

  get displayLogin() {
    return this._displayLogin;
  }

}
