import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-display-2"> hello, instore! </span>
      <button mat-raised-button color="primary" routerLink="/manager">login as Manager</button>
    </div>
  `,
  styles: [

    `
    div[fxLayout] { margin-top: 32 px;}
    `
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('i was conte')
  }

}
