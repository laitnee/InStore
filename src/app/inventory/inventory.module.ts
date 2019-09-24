import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { MaterialModule } from '../material.module';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';
import { StockInventoryComponent } from './stock-inventory/stock-inventory.component';


@NgModule({
  declarations: [InventoryComponent, ProductsComponent, CategoriesComponent, InventoryHomeComponent, StockInventoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
