import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerComponent } from './manager.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';
import { MaterialModule } from '../material.module';
// import { Routes } from '@angular/router';

// export const managerModuleRoutes: Routes = [
//   { path: '', component: ManagerHomeComponent}
// ];
@NgModule({
  declarations: [ManagerHomeComponent, ManagerComponent, UserManagementComponent, ReceiptLookupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
