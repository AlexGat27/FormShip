import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmodelService {

  constructor(private http: HttpClient) { }

  SendData2Server(url: string, data): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url, data, httpOptions);
  }
  GetDataFromServer(url: string): Observable<any>{
    return this.http.get(url);
  }

  DeleteModel(url: string){
    return this.http.delete(url);
  }
}
