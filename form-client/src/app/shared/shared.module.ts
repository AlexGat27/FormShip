import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: "", 
    component: MainLayoutComponent, 
    loadChildren: () => import('../modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "shipform", 
    component: MainLayoutComponent, 
    loadChildren: () => import('../modules/input-ship/input-ship.module').then(m => m.InputShipModule)
  }
];

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SharedModule { }
