import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {
  private readonly apiUrl = environment.api_rapidita;
  constructor(public httpclient: HttpClient) { }

  GetTransacciones(): Observable<any> {
    const url = `${this.apiUrl}Transacciones/GetTransacciones`;
    return this.httpclient.get(url);
  }

  GetTransaccionesxcajaPuntojuego_id(caja_id: number,puntoJuego_id: number): Observable<any> {
    const url = `${this.apiUrl}Transacciones/GetTransaccionesxcajaPuntojuego_id/${caja_id}/${puntoJuego_id}`;
    return this.httpclient.get(url);
  }

}
