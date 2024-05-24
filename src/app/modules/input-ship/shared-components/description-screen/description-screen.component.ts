import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Model } from '../../../../core/interfaces/models.interface';
import { ShipmodelService } from '../../../../core/services/shipmodel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-description-screen',
  templateUrl: './description-screen.component.html',
  styleUrl: './description-screen.component.css'
})
export class DescriptionScreenComponent {
  @Input({required: true}) selectedModel: Model | null;
  @Input() tablename: string | null;
  @Output() selectedModelChange = new EventEmitter<Model | null>();
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
        default:
          message = "Неизвестная ошибка сервера";
          break
      }
      this.snackBar.open(message, 'OK', {
        duration: 3000 // Длительность отображения всплывающего окна в миллисекундах
      });
    }, () => {this.closeFullScreen();});
  }
}
