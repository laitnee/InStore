import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  template: `
  <mat-toolbar>
  <a mat-button color="primary" routerLink="/inventory/home"  routerLinkActive="active-link">Inventory Dashboard</a>
  <a mat-button color="primary" routerLink="/inventory/stockentry"  routerLinkActive="active-link">Stock Entry</a>
  <a mat-button color="primary" routerLink="/inventory/products"  routerLinkActive="active-link">Products</a>
  <a mat-button color="primary" routerLink="/inventory/categories"  routerLinkActive="active-link">categories</a>
  </mat-toolbar>
  <router-outlet></router-outlet>
  `,
  styles: [
    `.active-link {
      font-weight: bold;
      border-bottom: 2px solid #005005;
    }`
  ]
})
export class InventoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
