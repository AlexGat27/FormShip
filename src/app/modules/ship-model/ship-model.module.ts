import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Добавьте этот импорт
import { ShipModelComponent } from './components/ship-model/ship-model.component';

const routes: Routes = [
  {path: "ship", component: ShipModelComponent},
];

@NgModule({
  declarations: [ShipModelComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    ReactiveFormsModule, FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ShipModelModule { }
