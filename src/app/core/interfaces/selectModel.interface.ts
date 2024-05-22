import { Model, ShipSystemModel } from "./models.interface";

export interface SelectedShipModel{
    ship: Model;
    ship_systems: SelectedSystemShipModel[];
}

export interface SelectedSystemShipModel{
    dangers: Model[];
    equipments: SelectedEquipmentModel[];
    security_indicators: Model[];
    system_ship: ShipSystemModel;
}

export interface SelectedEquipmentModel{
    equipment: Model;
    protections: Model[];
    vulnerabilities: Model[];
}