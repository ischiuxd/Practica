import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
URL:string="http://localhost:5000/api/usuarios";

  constructor(private http:HttpClient) {}

  getusuarios(): Observable<any>{
    return this.http.get(this.URL).pipe(res=>res);
  }

}
