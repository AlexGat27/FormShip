import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ShipFormComponent } from './components/ship-form/ship-form.component';
import { ShipSystemFormComponent } from './components/ship-system-form/ship-system-form.component';
import { DangerFormComponent } from './components/danger-form/danger-form.component';
import { EquipmentFormComponent } from './components/equipment-form/equipment-form.component';
import { SecurityIndicatorFormComponent } from './components/security-indicator-form/security-indicator-form.component';
import { SysshipAssociationFormComponent } from './components/sysship-association-form/sysship-association-form.component';
import { SecuritysysAssociationFormComponent } from './components/securitysys-association-form/securitysys-association-form.component';
import { ProtectionFormComponent } from './components/protection-form/protection-form.component';
import { VulnerabilityFormComponent } from './components/vulnerability-form/vulnerability-form.component';

const routes: Routes = [
  {path: "ship", component: ShipFormComponent},
  {path: "ship-system", component: ShipSystemFormComponent},
  {path: "danger", component: DangerFormComponent},
  {path: "equipment", component: EquipmentFormComponent},
  {path: "security-indicator", component: SecurityIndicatorFormComponent},
  {path: "sysship-association", component: SysshipAssociationFormComponent},
  {path: "securitysys-association", component: SecuritysysAssociationFormComponent},
];

@NgModule({
  declarations: [
    ShipFormComponent,
    ShipSystemFormComponent,
    DangerFormComponent,
    EquipmentFormComponent,
    SecurityIndicatorFormComponent,
    SysshipAssociationFormComponent,
    SecuritysysAssociationFormComponent,
    ProtectionFormComponent,
    VulnerabilityFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InputShipModule { }
