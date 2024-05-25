import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShipSystemModel } from '../../../../core/interfaces/models.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShipmodelService } from '../../../../core/services/shipmodel.service';

@Component({
  selector: 'app-description-screen-sysship',
  templateUrl: './description-screen-sysship.component.html',
  styleUrl: './description-screen-sysship.component.css'
})
export class DescriptionScreenSysshipComponent {
  @Input() selectedModel: ShipSystemModel | null;
  @Input() tablename: string | null;
  @Output() selectedModelChange = new EventEmitter<ShipSystemModel | null>();
  @Output() deletedModel = new EventEmitter<number>();

  constructor(private shipService: ShipmodelService, private snackBar: MatSnackBar){}

  closeFullScreen(){
    console.log(this.selectedModel)
    this.selectedModel = null;
    this.selectedModelChange.emit(this.selectedModel);
  }

  deleteModel(){
    this.shipService.DeleteModel(`api/v1/deleteModel?id=${this.selectedModel.id}&tablename=${this.tablename}`)
    .subscribe(response => {
      console.log(response);
      this.deletedModel.emit(this.selectedModel.id);
      this.snackBar.open('Модель успешно удалена', 'OK', {
        duration: 3000 // Длительность отображения всплывающего окна в миллисекундах
      });
    }, error => {
      let message = ''
      switch(error.status){
        case 404:
          message = "Ошибка. Модель не найдена";
          break;
        case 500:
          message = "Ошибка. Скорее всего запись связана с другой по ключу";
          break;
        default:
          message = "Неизвестная ошибка сервера";
          break;
      }
      this.snackBar.open(message, 'OK', {
        duration: 3000 // Длительность отображения всплывающего окна в миллисекундах
      });
    }, () => {this.closeFullScreen();});
  }
}
