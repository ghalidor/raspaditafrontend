import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { cajaEditar, cajaNuevo } from 'src/app/module/caja';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  private readonly apiUrl = environment.api_rapidita;
  constructor(public httpclient: HttpClient) { }

  GetCajas(): Observable<any> {
    const url = `${this.apiUrl}Caja/GetCajas`;
    return this.httpclient.get(url);
  }

  GetDetalleCaja(id: number): Observable<any> {
    const url = `${this.apiUrl}Caja/GetDetalleCaja/${id}`;
    return this.httpclient.get(url);
  }

  GetCajasxLocal_id(local_id: number): Observable<any> {
    const url = `${this.apiUrl}Caja/GetCajasxLocal_id/${local_id}`;
    return this.httpclient.get(url);
  }

  CreateCaja(caja: cajaNuevo): Observable<any> {
    const url = `${this.apiUrl}Caja/CreateCaja`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<cajaNuevo>(url, caja, { headers });
  }

  UpdateCaja(caja: cajaEditar): Observable<any> {
    const url = `${this.apiUrl}Caja/UpdateCaja`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<cajaEditar>(url, caja, { headers });
  }
}
