import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ShipFormComponent } from './components/ship-form/ship-form.component';
import { ShipSystemFormComponent } from './components/ship-system-form/ship-system-form.component';
import { DangerFormComponent } from './components/danger-form/danger-form.component';
import { EquipmentFormComponent } from './components/equipment-form/equipment-form.component';
import { SecurityIndicatorFormComponent } from './components/security-indicator-form/security-indicator-form.component';

const routes: Routes = [
  {path: "ship", component: ShipFormComponent},
  {path: "ship-system", component: ShipSystemFormComponent},
  {path: "danger", component: DangerFormComponent},
  {path: "equipment", component: EquipmentFormComponent},
  {path: "security-indicator", component: SecurityIndicatorFormComponent},
  
];

@NgModule({
  declarations: [
    ShipFormComponent,
    ShipSystemFormComponent,
    DangerFormComponent,
    EquipmentFormComponent,
    SecurityIndicatorFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InputShipModule { }
