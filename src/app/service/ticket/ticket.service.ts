import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ticketNuevo } from 'src/app/module/ticket';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly apiUrl = environment.api_rapidita;
  constructor(public httpclient: HttpClient) { }

  GetTicketxCaja_id(caja_id: number): Observable<any> {
    const url = `${this.apiUrl}Ticket/GetTicketxCaja_id/${caja_id}`;
    return this.httpclient.get(url);
  }

  GenerarTicket(ticket: ticketNuevo): Observable<any> {
    const url = `${this.apiUrl}Ticket/GenerarTicket`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<ticketNuevo>(url, ticket, { headers });
  }

  GetSaldoTicket(ticket: ticketNuevo): Observable<any> {
    const url = `${this.apiUrl}Ticket/GenerarTicket`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<ticketNuevo>(url, ticket, { headers });
  }

}
