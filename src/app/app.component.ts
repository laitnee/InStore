import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './core/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayAccountIcons = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private authService: AuthService){
    iconRegistry.addSvgIcon(
      'instore', sanitizer.bypassSecurityTrustResourceUrl('./../assets/img/icons/shopping-store.svg')
    );
  }

  ngOnInit() {
    this.authService.authStatus.subscribe(
      authStatus => (this.displayAccountIcons = authStatus.isAuthenticated)
    );
  }
}
