import { Component, Input } from '@angular/core';
import { ShipmodelService } from '../../services/shipmodel.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-protection-form',
  templateUrl: './protection-form.component.html',
  styleUrls: ['./protection-form.component.css', '../../input-style.css']
})
export class ProtectionFormComponent {
  form: FormGroup;
  aSub: Subscription;
  modelTitles: string[];
  equipmentTitles: string[];
  @Input() responseError: boolean;
  constructor(private shipModelService: ShipmodelService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      equipment: new FormControl(null, [Validators.required]),
    })
    this.shipModelService.GetDataFromServer("api/v1/getModel/protections").subscribe(data =>{
      this.modelTitles = data;
      this.shipModelService.GetDataFromServer("api/v1/getModel/equipments").subscribe(data =>{
        this.equipmentTitles = data;
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
    this.aSub = this.shipModelService.SendData2Server( "api/v1/create/protection", this.form.value).subscribe(
      (response) => {
        this.snackBar.open('Модель создана успешно', 'OK', {
          duration: 5000 // Длительность отображения всплывающего окна в миллисекундах
        });
        this.modelTitles.push(response);
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
