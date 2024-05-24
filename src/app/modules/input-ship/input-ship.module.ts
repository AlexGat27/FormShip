import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SysequipmentAssociationComponent } from './components/sysequipment-association/sysequipment-association.component';
import { DescriptionScreenComponent } from './shared-components/description-screen/description-screen.component';

const routes: Routes = [
  {path: "ship", component: ShipFormComponent},
  {path: "ship-system", component: ShipSystemFormComponent},
  {path: "danger", component: DangerFormComponent},
  {path: "equipment", component: EquipmentFormComponent},
  {path: "protection", component: ProtectionFormComponent},
  {path: "vulnerability", component: VulnerabilityFormComponent},
  {path: "security-indicator", component: SecurityIndicatorFormComponent},
  {path: "sysship-association", component: SysshipAssociationFormComponent},
  {path: "securitysys-association", component: SecuritysysAssociationFormComponent},
  {path: "sysequipment-association", component: SysequipmentAssociationComponent},
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
    SysequipmentAssociationComponent,
    DescriptionScreenComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule.forChild(routes)
  ]
})
export class InputShipModule { }
