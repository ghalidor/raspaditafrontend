import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { puntojuegoEditar, puntojuegoNuevo } from 'src/app/module/puntojuego';

@Injectable({
  providedIn: 'root'
})
export class PuntojuegoService {
  private readonly apiUrl = environment.api_rapidita;
  constructor(public httpclient: HttpClient) { }

  GetPuntoJuego(): Observable<any> {
    const url = `${this.apiUrl}PuntoJuego/GetPuntoJuego`;
    return this.httpclient.get(url);
  }

  GetDetallePuntoJuego(id: number): Observable<any> {
    const url = `${this.apiUrl}PuntoJuego/GetDetallePuntoJuego/${id}`;
    return this.httpclient.get(url);
  }

  GetPuntoJuegoxLocal_id(local_id: number): Observable<any> {
    const url = `${this.apiUrl}PuntoJuego/GetPuntoJuegoxLocal_id/${local_id}`;
    return this.httpclient.get(url);
  }

  CreatePuntoJuego(caja: puntojuegoNuevo): Observable<any> {
    const url = `${this.apiUrl}PuntoJuego/CreatePuntoJuego`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<puntojuegoNuevo>(url, caja, { headers });
  }

  UpdatePuntoJuego(caja: puntojuegoEditar): Observable<any> {
    const url = `${this.apiUrl}PuntoJuego/UpdatePuntoJuego`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<puntojuegoEditar>(url, caja, { headers });
  }

}
