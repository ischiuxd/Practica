import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BuscarCrsService {

  URL:string="http://localhost:5000/api/cursos";

  constructor(private http:HttpClient) {}

  getcursos(): Observable<any>{
    return this.http.get(this.URL).pipe(res=>res);
  }


}
