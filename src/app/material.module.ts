import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatCardModule, MatInputModule, MatTooltipModule, MatSnackBarModule, MatDialogModule } from "@angular/material";


@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
