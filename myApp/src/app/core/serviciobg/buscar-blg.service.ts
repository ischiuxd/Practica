import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BuscarBLGService {
  URL:string="http://localhost:5000/api/blog";

  constructor(private http:HttpClient) {}

  getposteso(): Observable<any>{
    return this.http.get(this.URL).pipe(res=>res);
  }
}
