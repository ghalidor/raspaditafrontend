import { Component, ViewChild, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ticket,ticketSaldo } from 'src/app/module/ticket';
import { TicketService } from 'src/app/service/ticket/ticket.service';
import { GenerarticketComponent } from '../generarticket/generarticket.component';
import { usuarioCajaNuevo, usuarioCajaRespuesta } from 'src/app/module/usuario';
import { PagarticketComponent } from '../pagarticket/pagarticket.component';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit,OnDestroy {
  closeResult = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  id: number;
  listaticket: ticket[];
  monto:number;
  usuario =new usuarioCajaRespuesta();
  ticketSaldo=new ticketSaldo();
  constructor(private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private ticketService:TicketService) { }

  ngOnInit(): void {
    this.id = 0;
    this.monto=0.0;
    this.dtOptions = {
      destroy: true,
      pagingType: 'first_last_numbers',
      pageLength: 10,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
      // language: {
      //   url: 'assets/es-mx.json'
      // },
      language: {
        url: 'assets/es-mx.json'
      },
      dom:
        "<'row'<'col-12' <'row'<'col-2 col-md-1'l><'col-md-11 col-10'f> >>>" +
        "<'row'<'col-12 mt-2'tr>>" +
        "<'row'<'col-5'i><'col-7'p>>",
      responsive: true,
      processing: true,
      autoWidth: true,
      scrollCollapse: false,
      scrollX: true,
      order: [],
      "columnDefs": [{
        "targets": 7,
        "orderable": false
      }],
    };
    this.ListaTicket();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  open(modal: TemplateRef<any>, tamanio: string) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', size: tamanio }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  opensaldo(id: number) {
    this.id = id;
    this.ticketService.GetSaldoTicket(this.id).subscribe({
      next: response => {
        
        if (response.response) {
          this.toastr.success(response.message);
          this.ticketSaldo = response;
          console.log(this.ticketSaldo);
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

  ListaTicket() {
    if (this.dtElement != null) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    }
    this.spinnerService.show();
    this.usuario= JSON.parse(localStorage.getItem('usuario'));
    this.ticketService.GetTicketxCaja_id(this.usuario.caja_id).subscribe({
      next: response => {
        this.listaticket = response.data;
        this.dtTrigger.next(0);
        let finalSum = 0;
        this.listaticket.forEach((item) => {
          finalSum += item.monto;
             
          })

        this.monto= finalSum;
      },
      complete: () => {
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
  }

  acreditar(){
    const modalRef = this.modalService.open(GenerarticketComponent, { size: 'sm' });
    modalRef.componentInstance.padre=this;
  }

  pagar(){
    const modalRef = this.modalService.open(PagarticketComponent, { size: 'sm' });
    modalRef.componentInstance.padre=this;
  }

  imprimirPago(){
    
  }

 
}
