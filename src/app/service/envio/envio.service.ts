import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { envioNuevo } from 'src/app/module/envio';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {
  private readonly apiUrl = environment.api_rapidita;
  constructor(public httpclient: HttpClient) { }

  GetEnvios(): Observable<any> {
    const url = `${this.apiUrl}Envio/GetEnvios`;
    return this.httpclient.get(url);
  }

  GetEnvioxPuntojuego(puntoJuego_id: number): Observable<any> {
    const url = `${this.apiUrl}Envio/GetEnvioxPuntojuego/${puntoJuego_id}`;
    return this.httpclient.get(url);
  }

  CreateEnvio(envio: envioNuevo): Observable<any> {
    const url = `${this.apiUrl}Envio/CreateEnvio`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<envioNuevo>(url, envio, { headers });
  }

}
