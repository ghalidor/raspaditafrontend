import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { localNuevo } from 'src/app/module/local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private readonly apiUrl = environment.api_rapidita;
  constructor(public httpclient: HttpClient) { }

  GetLocales(): Observable<any> {
    const url = `${this.apiUrl}Local/GetLocales`;
    return this.httpclient.get(url);
  }

  GetDetalleLocal(id: number): Observable<any> {
    const url = `${this.apiUrl}Local/GetDetalleLocal/${id}`;
    return this.httpclient.get(url);
  }

  CreateEnvio(local: localNuevo): Observable<any> {
    const url = `${this.apiUrl}Local/CreateLocal`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<localNuevo>(url, local, { headers });
  }
}
