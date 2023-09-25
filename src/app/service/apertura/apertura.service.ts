import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { aperturaCerrar, aperturaNuevo } from 'src/app/module/apertura';

@Injectable({
  providedIn: 'root'
})
export class AperturaService {
  private readonly apiUrl = environment.api_rapidita;
  constructor(public httpclient: HttpClient) { }

  GetAperturaxLocal_idxCaja_id(local_id: number,caja_id: number): Observable<any> {
    const url = `${this.apiUrl}Apertura/GetAperturaxLocal_idxCaja_id/${local_id}/${caja_id}`;
    return this.httpclient.get(url);
  }

  CreateApertura(apertura:aperturaNuevo): Observable<any> {
    const url = `${this.apiUrl}Apertura/CreateApertura`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<aperturaNuevo>(url,apertura, { headers });
  }

  CloseApertura(apertura: aperturaCerrar): Observable<any> {
    const url = `${this.apiUrl}Apertura/CloseApertura`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<aperturaCerrar>(url,apertura, { headers });
  }

}
