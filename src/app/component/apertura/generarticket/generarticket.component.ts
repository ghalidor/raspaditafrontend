import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ElementRef, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { puntojuego, puntojuegoNuevo } from 'src/app/module/puntojuego';
import { PuntojuegoService } from './../../../service/puntojuego/puntojuego.service';
import { ticket, ticketNuevo } from 'src/app/module/ticket';
import { TicketService } from 'src/app/service/ticket/ticket.service';
import { usuarioCajaNuevo, usuarioCajaRespuesta } from 'src/app/module/usuario';

@Component({
  selector: 'app-generarticket',
  templateUrl: './generarticket.component.html',
  styleUrls: ['./generarticket.component.css']
})
export class GenerarticketComponent implements OnInit, OnDestroy {
  listadispositivo: puntojuego[];
  @Input() padre;
  ticket = new ticket();
  usuario =new usuarioCajaRespuesta();
  ticketnuevo = new ticketNuevo();
  onCreateForm = this.formBuilder.group({
    'puntojuego_id': ['', Validators.compose([
      Validators.required
    ])],
    'credito': ['', Validators.compose([
      Validators.required
    ]),],
    'monto': ['', Validators.compose([
      Validators.required
    ])],
  });

  @ViewChild('credito') txtcredito: ElementRef;
  @ViewChild('btngenerar') btn_generar: ElementRef;

  constructor(
    private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private puntojuegoService: PuntojuegoService,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {

    this.ListaDispositivo();
  }

  ngOnDestroy(): void {

  }

  ListaDispositivo() {
    this.spinnerService.show();
    this.puntojuegoService.GetPuntoJuego().subscribe({
      next: response => {
        this.listadispositivo = response.data;
      },
      complete: () => {
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
  }

  generar() {
    if (this.onCreateForm.valid) {
      this.usuario= JSON.parse(localStorage.getItem('usuario'));
      this.ticketnuevo.caja_id = this.usuario.caja_id;
      this.ticketnuevo.puntojuego_id = this.ticket.puntojuego_id;
      this.ticketnuevo.credito = this.ticket.credito;
      this.ticketnuevo.monto = this.ticket.monto;
      this.ticketService.GenerarTicket(this.ticketnuevo).subscribe({
        next: response => {
          if (response.response) {

            this.toastr.success(response.message + ",Ticket Generado : " + response.ticket.nroticket);
            this.ticketnuevo = new ticketNuevo();
            this.padre.ListaTicket();
            this.activeModal.close();
          }
          else {
            this.toastr.error(response.message);
          }
        },
        complete: () => {
          this.spinnerService.hide();
        },
        error: (error) => {
          this.spinnerService.hide();
        }
      })
    }
    else {
      this.toastr.warning("Complete los campos obligatorios");
    }
  }

  valormonto(valor) {
    this.ticket.monto = valor.target.value * 1;
  }

  valorcredito(valor) {
    this.ticket.credito = valor.target.value * 1;
  }

  focucredito() {
    this.txtcredito.nativeElement.focus();
  }

  presionar(valor) {
    this.btn_generar.nativeElement.click();
  }
}
