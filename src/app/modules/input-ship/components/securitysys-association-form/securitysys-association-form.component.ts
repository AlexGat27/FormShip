import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShipmodelService } from '../../../../core/services/shipmodel.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Association, Model, ShipSystemModel } from '../../../../core/interfaces/models.interface';

@Component({
  selector: 'app-securitysys-association-form',
  templateUrl: './securitysys-association-form.component.html',
  styleUrls: ['./securitysys-association-form.component.css', '../../input-style.css']
})
export class SecuritysysAssociationFormComponent {
  form: FormGroup;
  aSub: Subscription;
  @Input() responseError: boolean;
  securityIndicatorTitles: string[];
  shipSystemTitles: string[];
  associations: Association[];
  selectedSecurityModel: Model;
  selectedShipSystemModel: ShipSystemModel;
  constructor(private shipModelService: ShipmodelService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.form = new FormGroup({
      security_indicator: new FormControl(null, [Validators.required]),
      ship_system: new FormControl(null, [Validators.required]),
    })
    this.shipModelService.GetDataFromServer("api/v1/getModel/security-indicators").subscribe(data =>{
      this.securityIndicatorTitles = data.map(row => row.title);
      this.shipModelService.GetDataFromServer("api/v1/getModel/ship-systems").subscribe(data =>{
        this.shipSystemTitles = data.map(row => row.title);
        this.shipModelService.GetDataFromServer("api/v1/getAssociation/security-systems").subscribe(data =>{
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
    this.aSub = this.shipModelService.SendData2Server( "api/v1/create/security-sys-association", this.form.value).subscribe(
      (response) => {
        this.snackBar.open('Модель создана успешно', 'OK', {
          duration: 5000 // Длительность отображения всплывающего окна в миллисекундах
        });
        this.shipModelService.GetDataFromServer("api/v1/getAssociation/security-systems").subscribe(data =>{
          this.associations = data;
          this.form.enable();
          this.form.reset();
        })
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
  openFullScreen(model) {
    if (model.category) {
      this.selectedShipSystemModel = model;
    } else {
      this.selectedSecurityModel = model;
    }
  }
  deleteAssociation(id: number){
    this.shipModelService.DeleteModel(`api/v1/deleteModel?id=${id}&tablename=${'system_and_indicators'}`)
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
