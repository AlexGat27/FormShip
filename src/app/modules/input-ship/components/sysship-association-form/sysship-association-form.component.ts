import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShipmodelService } from '../../../../core/services/shipmodel.service';
import { Observable, Subscription, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Association, Model, ShipSystemModel } from '../../../../core/interfaces/models.interface';

@Component({
  selector: 'app-sysship-association-form',
  templateUrl: './sysship-association-form.component.html',
  styleUrls: ['./sysship-association-form.component.css', '../../input-style.css']
})
export class SysshipAssociationFormComponent {
  form: FormGroup;
  aSub: Subscription;
  @Input() responseError: boolean;
  shipTitles: string[];
  shipSystemTitles: string[];
  associations: Association[];
  selectedShipModel: Model;
  selectedShipSystemModel: ShipSystemModel;
  constructor(private shipModelService: ShipmodelService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.form = new FormGroup({
      ship: new FormControl(null, [Validators.required]),
      ship_system: new FormControl(null, [Validators.required]),
    })
    this.shipModelService.GetDataFromServer("api/v1/getModel/ships").subscribe(data =>{
      this.shipTitles = data.map(row => row.title);
      this.shipModelService.GetDataFromServer("api/v1/getModel/ship-systems").subscribe(data =>{
        this.shipSystemTitles = data.map(row => row.title);
        this.shipModelService.GetDataFromServer("api/v1/getAssociation/ship-systems").subscribe(data =>{
          console.log(data)
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
    this.aSub = this.shipModelService.SendData2Server( "api/v1/create/system-ship-association", this.form.value).subscribe(
      (response) => {
        this.snackBar.open('Модель создана успешно', 'OK', {
          duration: 5000, // Длительность отображения всплывающего окна в миллисекундах
          panelClass: ['snack-success']
        });
        this.shipModelService.GetDataFromServer("api/v1/getAssociation/ship-systems").subscribe(data =>{
          this.associations = data;
          this.form.enable();
          this.form.reset();
        })
      },
      error => {
        this.snackBar.open(`Ошибка создания модели: ${error.message}`, 'OK', {
          duration: 5000,
          panelClass: ['snack-error'] // Длительность отображения всплывающего окна в миллисекундах
        });
        this.responseError = true;
        this.form.enable();
      }
    );
  }
  openFullScreen(model) {
    if (model.category) {
      this.selectedShipSystemModel = model;
    } else {
      this.selectedShipModel = model;
    }
  }
  deleteAssociation(id: number){
    this.shipModelService.DeleteModel(`api/v1/deleteModel?id=${id}&tablename=${'ship_and_systems'}`)
    .subscribe(response => {
      console.log(response);
      this.associations = this.associations.filter(association => association.id != id);
      this.snackBar.open('Связь успешно удалена', 'OK', {
        duration: 3000 // Длительность отображения всплывающего окна в миллисекундах
      });
    }, error => {
      let message = ''
      switch(error.status){
        case 404:
          message = "Ошибка. Связь не найдена";
          break;
        default:
          message = "Неизвестная ошибка сервера";
          break;
      }
      this.snackBar.open(message, 'OK', {
        duration: 3000 // Длительность отображения всплывающего окна в миллисекундах
      });
    })
  }
}
