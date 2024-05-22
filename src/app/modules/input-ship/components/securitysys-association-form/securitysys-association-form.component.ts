import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShipmodelService } from '../../../../core/services/shipmodel.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Association, Model } from '../../../../core/interfaces/models.interface';

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
  selectedModel: Model;
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
  openFullScreen(model: Model) {
    this.selectedModel = model;
  }

  closeFullScreen() {
    this.selectedModel = null;
  }
}
