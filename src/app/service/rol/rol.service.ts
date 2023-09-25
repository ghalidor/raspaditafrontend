import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { rolEditar, rolNuevo } from 'src/app/module/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private readonly apiUrl = environment.api_rapidita;
  constructor(public httpclient: HttpClient) { }

  GetRoles(): Observable<any> {
    const url = `${this.apiUrl}Rol/GetRol`;
    return this.httpclient.get(url);
  }

  GetDetalleRol(id: number): Observable<any> {
    const url = `${this.apiUrl}Rol/GetDetalleRol/${id}`;
    return this.httpclient.get(url);
  }

  CreateRol(rol: rolNuevo): Observable<any> {
    const url = `${this.apiUrl}Rol/CreateRol`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<rolNuevo>(url, rol, { headers });
  }

  UpdateRol(rol: rolEditar): Observable<any> {
    const url = `${this.apiUrl}Rol/UpdateRol`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<rolEditar>(url, rol, { headers });
  }
}
