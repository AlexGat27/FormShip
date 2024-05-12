import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {
  form!: FormGroup;
  errorMessage: string = null;
  succesfullMessage: string = null;

  constructor(private http: HttpClient){
    this.form = new FormGroup({
      id: new FormControl(1, [Validators.required, Validators.pattern('^-?[0-9]*$'), Validators.max(100), Validators.min(0)]),
      system: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(500)])
    }) 
  }

  OnSubmit(){
    this.form.disable();
    this.http.post<any>('api/v1/form/saveForm', this.form.value).subscribe(
      response => {
        this.errorMessage = null;
        this.succesfullMessage = response.message;
        this.form.enable();
      },
      er => {
        this.errorMessage = er.error.error;
        this.form.enable();
      }
    );
  }
}
