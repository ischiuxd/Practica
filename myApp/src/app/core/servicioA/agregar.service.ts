import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuariosinterfaz } from '../../Interfaces/Usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class AgregarService {
  private apiUrl = 'http://localhost:5000/api/agregarU';

  constructor(private http: HttpClient) { }

  agregarUsuario(usuario: Usuariosinterfaz): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
}
