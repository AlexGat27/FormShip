import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShipmodelService } from '../../../../core/services/shipmodel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Model } from '../../../../core/interfaces/models.interface';
import { SelectedEquipmentModel, SelectedShipModel, SelectedSystemShipModel } from '../../../../core/interfaces/selectModel.interface';

@Component({
  selector: 'app-ship-model',
  templateUrl: './ship-model.component.html',
  styleUrl: './ship-model.component.css'
})
export class ShipModelComponent {
  form: FormGroup;
  aSub: Subscription;
  shipModel: SelectedShipModel;
  shipTitles: string[];
  responseError: boolean;
  selectedShipSystem: SelectedSystemShipModel = null;
  selectedEquipment: SelectedEquipmentModel = null;
  selectedModel: Model = null;
  constructor(private shipModelService: ShipmodelService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
    })
    this.shipModelService.GetDataFromServer("api/v1/getModel/ships").subscribe(data =>{
      this.shipTitles = data.map(data => data.title);
    })
    this.responseError = false;
  }
  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe();
    }
  }

  OnSubmit(){
    this.form.disable();
    this.shipModelService.GetDataFromServer(`api/v1/selectModel/ship?ship_name=${this.form.value.title}`).subscribe(data =>{
      this.shipModel = data;
      this.selectedEquipment = null;
      this.selectedShipSystem = null;
      console.log(this.shipModel);
    }, 
    error => {
      console.error(error);
    },
    () =>{
      this.form.enable();
    })
  }

  selectShipSystem(ship_system: SelectedSystemShipModel){
    this.selectedShipSystem = ship_system;
    this.selectedEquipment = null;
  }
  selectEquipment(equipment: SelectedEquipmentModel){
    this.selectedEquipment = equipment;
  }
  openFullScreen(model: Model){
    console.log(model)
    this.selectedModel = model;
  }
  closeFullScreen(){
    this.selectedModel = null;
  }
}
