import { Component, Input } from '@angular/core';
import { ShipmodelService } from '../../../../core/services/shipmodel.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Model } from '../../../../core/interfaces/models.interface';

@Component({
  selector: 'app-danger-form',
  templateUrl: './danger-form.component.html',
  styleUrls: ['./danger-form.component.css', '../../input-style.css']
})
export class DangerFormComponent {
  form: FormGroup;
  aSub: Subscription;
  models: Model[];
  selectedModel: Model;
  shipSystems: string[];
  @Input() responseError: boolean;
  constructor(private shipModelService: ShipmodelService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
      ship_system: new FormControl(null, [Validators.required])
    })
    this.shipModelService.GetDataFromServer("api/v1/getModel/dangers").subscribe(data =>{
      this.models = data;
      this.shipModelService.GetDataFromServer("api/v1/getModel/ship-systems").subscribe(data =>{
        this.shipSystems = data.map(row => row.title);
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
    this.aSub = this.shipModelService.SendData2Server( "api/v1/create/danger", this.form.value).subscribe(
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

  deleteModel(id: number) {
    this.models = this.models.filter(model => model.id != id);
  }
  getModels(): Observable<any>{
    return this.shipModelService.GetDataFromServer("api/v1/getModel/dangers").pipe(
      tap(data => {
        this.models = data;
        this.shipModelService.GetDataFromServer("api/v1/getModel/ship-systems").subscribe(data =>{
          this.shipSystems = data.map(row => row.title);
        })
      })
    )
  }
}
