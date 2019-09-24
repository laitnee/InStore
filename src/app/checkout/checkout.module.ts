import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
