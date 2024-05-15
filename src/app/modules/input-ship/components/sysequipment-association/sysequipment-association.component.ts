import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShipmodelService } from '../../services/shipmodel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sysequipment-association',
  templateUrl: './sysequipment-association.component.html',
  styleUrls: ['./sysequipment-association.component.css', '../../input-style.css']
})
export class SysequipmentAssociationComponent {
  form: FormGroup;
  aSub: Subscription;
  responseError: boolean;
  equipmentTitles: string[];
  shipSystemTitles: string[];
  associations: string[];
  constructor(private shipModelService: ShipmodelService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.form = new FormGroup({
      equipment: new FormControl(null, [Validators.required]),
      ship_system: new FormControl(null, [Validators.required]),
    })
    this.shipModelService.GetDataFromServer("api/v1/getModel/equipments").subscribe(data =>{
      this.equipmentTitles = data;
      this.shipModelService.GetDataFromServer("api/v1/getModel/ship-systems").subscribe(data =>{
        this.shipSystemTitles = data;
        this.shipModelService.GetDataFromServer("api/v1/getAssociation/equipment-systems").subscribe(data =>{
          this.associations = data;
        })
      })
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
    this.aSub = this.shipModelService.SendData2Server( "api/v1/create/system-equipment-association", this.form.value).subscribe(
      (response) => {
        this.snackBar.open('Модель создана успешно', 'OK', {
          duration: 5000 // Длительность отображения всплывающего окна в миллисекундах
        });
        this.associations.push(response)
        this.form.enable();
        this.form.reset();
      },
      error => {
        this.snackBar.open(`Ошибка создания модели: ${error.message}`, 'OK', {
          duration: 5000 // Длительность отображения всплывающего окна в миллисекундах
        });
        this.responseError = true;
        this.form.enable();
      }
    );
  }
}
