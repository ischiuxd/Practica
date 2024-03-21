import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarCLService {

  constructor(private http: HttpClient) { }

  obtenerInfoPersona(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/personas/${id}`);
  }
}
