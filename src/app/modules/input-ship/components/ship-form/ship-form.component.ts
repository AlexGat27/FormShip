import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { ShipmodelService } from '../../../../core/services/shipmodel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Model } from '../../../../core/interfaces/models.interface';

@Component({
  selector: 'app-ship-form',
  templateUrl: './ship-form.component.html',
  styleUrls: ['./ship-form.component.css', '../../input-style.css']
})
export class ShipFormComponent {
  form: FormGroup;
  aSub: Subscription;
  models: Model[];
  responseError: boolean;
  selectedModel: Model;
  constructor(private shipModelService: ShipmodelService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
    })
    this.getModels().subscribe();
    this.responseError = false;
  }
  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe();
    }
  }

  OnSubmit(){
    this.form.disable();
    this.aSub = this.shipModelService.SendData2Server( "api/v1/create/ship", this.form.value).subscribe(
      (response) => {
        this.getModels().subscribe(() => {
          this.snackBar.open('Модель создана успешно', 'OK', {
            duration: 5000 // Длительность отображения всплывающего окна в миллисекундах
          });
          this.form.enable();
          this.form.reset();
        });
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
  deleteModel(id: number) {
    this.models = this.models.filter(model => model.id != id);
  }
  getModels(): Observable<any>{
    return this.shipModelService.GetDataFromServer("api/v1/getModel/ships").pipe(
      tap(data =>{
        this.models = data;
      })
    )
  }
}
