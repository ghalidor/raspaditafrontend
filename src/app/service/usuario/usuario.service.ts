import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { usuarioEditar, usuarioNuevo } from 'src/app/module/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly apiUrl = environment.api_rapidita;
  constructor(public httpclient: HttpClient) { }

  GetUsuarios(): Observable<any> {
    const url = `${this.apiUrl}Usuario/GetUsuarios`;
    return this.httpclient.get(url);
  }

  GetDetalleUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}Usuario/GetDetalleUsuario/${id}`;
    return this.httpclient.get(url);
  }

  GetUsuariosxLocal_id(local_id: number): Observable<any> {
    const url = `${this.apiUrl}Usuario/GetUsuariosxLocal_id/${local_id}`;
    return this.httpclient.get(url);
  }

  CreateUsuario(usuario: usuarioNuevo): Observable<any> {
    const url = `${this.apiUrl}Usuario/CreateUsuario`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<usuarioNuevo>(url, usuario, { headers });
  }

  UpdateUsuario(usuario: usuarioEditar): Observable<any> {
    const url = `${this.apiUrl}Usuario/UpdateUsuario`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<usuarioEditar>(url, usuario, { headers });
  }

  CreateUsuarioCaja(usuario: usuarioNuevo): Observable<any> {
    const url = `${this.apiUrl}Usuario/CreateUsuarioCaja`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<usuarioNuevo>(url, usuario, { headers });
  }

  CreateUsuarioLocal(usuario: usuarioNuevo): Observable<any> {
    const url = `${this.apiUrl}Usuario/CreateUsuarioLocal`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<usuarioNuevo>(url, usuario, { headers });
  }
}
