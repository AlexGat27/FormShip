import { Component, Input } from '@angular/core';
import { ShipmodelService } from '../../../../core/services/shipmodel.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Model } from '../../../../core/interfaces/models.interface';

@Component({
  selector: 'app-security-indicator-form',
  templateUrl: './security-indicator-form.component.html',
  styleUrls: ['./security-indicator-form.component.css', '../../input-style.css']
})
export class SecurityIndicatorFormComponent {
  form: FormGroup;
  aSub: Subscription;
  @Input() responseError: boolean;
  models: Model[];
  selectedModel: Model;
  constructor(private shipModelService: ShipmodelService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      ship_system: new FormControl(null, [Validators.required]),
    })
    this.shipModelService.GetDataFromServer("api/v1/getModel/security-indicators").subscribe(data =>{
      this.models = data;
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
    this.aSub = this.shipModelService.SendData2Server( "api/v1/create/security-indicator", this.form.value).subscribe(
      (response) => {
        this.snackBar.open('Модель создана успешно', 'OK', {
          duration: 5000 // Длительность отображения всплывающего окна в миллисекундах
        });
        this.models.push(this.form.value);
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
  openFullScreen(model: Model) {
    this.selectedModel = model;
  }

  closeFullScreen() {
    this.selectedModel = null;
  }
}
