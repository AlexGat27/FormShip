import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShipmodelService } from '../../../../core/services/shipmodel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShipSystemModel } from '../../../../core/interfaces/models.interface';

@Component({
  selector: 'app-ship-system-form',
  templateUrl: './ship-system-form.component.html',
  styleUrls: ['./ship-system-form.component.css', '../../input-style.css']
})
export class ShipSystemFormComponent {
  form: FormGroup;
  aSub: Subscription;
  models: ShipSystemModel[];
  selectedModel: ShipSystemModel;
  @Input() responseError: boolean;
  constructor(private shipModelService: ShipmodelService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      type: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      category: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(3)]),
      document: new FormControl(null, [Validators.required, Validators.maxLength(100)])
    })
    this.shipModelService.GetDataFromServer("api/v1/getModel/ship-systems").subscribe(data =>{
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
    this.aSub = this.shipModelService.SendData2Server( "api/v1/create/ship-system", this.form.value).subscribe(
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
  openFullScreen(model: ShipSystemModel) {
    this.selectedModel = model;
  }

  closeFullScreen() {
    this.selectedModel = null;
  }
}
