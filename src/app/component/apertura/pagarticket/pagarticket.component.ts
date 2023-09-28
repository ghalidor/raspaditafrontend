import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ElementRef, Input, AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ticket ,ticketPagar} from 'src/app/module/ticket';
import { TicketService } from 'src/app/service/ticket/ticket.service';
import { usuarioCajaNuevo, usuarioCajaRespuesta } from 'src/app/module/usuario';

@Component({
  selector: 'app-pagarticket',
  templateUrl: './pagarticket.component.html',
  styleUrls: ['./pagarticket.component.css']
})
export class PagarticketComponent implements OnInit,AfterViewInit {
  @Input() padre;
  ticket = new ticket();
  ticketPagar = new ticketPagar();
  usuario =new usuarioCajaRespuesta();

  @ViewChild('nroticket') txtnroticket: ElementRef;
  @ViewChild('btnpagar') btnpagar: ElementRef;

  onCreateForm = this.formBuilder.group({
    'nroticket': ['', Validators.compose([
      Validators.required
    ])],
    // 'monto': ['', Validators.compose([
    //   Validators.required
    // ]),],
  });

  constructor(private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private ticketService: TicketService) { }

  ngOnInit(): void {
    //this.txtnroticket.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    this.txtnroticket.nativeElement.focus();
  }

  presionar(valor) {
    this.btnpagar.nativeElement.click();
  }

  pagoTicket() {
    this.usuario= JSON.parse(localStorage.getItem('usuario'));
    this.ticketPagar.caja_id=this.usuario.caja_id;
    this.ticketPagar.nroticket=this.ticket.nroticket;
    this.ticketService.PagarTicket(this.ticketPagar).subscribe({
      next: response => {
        if (response.response) {
          this.toastr.success(response.message);
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
}