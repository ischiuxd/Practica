import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddbgService {
  private apiUrl = 'http://localhost:5000/api/agregarBlog';

  constructor(private http: HttpClient) { }

  agregarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
}
