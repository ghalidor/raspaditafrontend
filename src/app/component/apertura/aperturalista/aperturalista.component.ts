import { Component, ViewChild, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { caja } from 'src/app/module/caja';
import { CajaService } from 'src/app/service/caja/caja.service';
import { AperturaService } from 'src/app/service/apertura/apertura.service';
import { apertura, aperturaNuevo, aperturaCerrar } from 'src/app/module/apertura';
import { usuarioCajaNuevo, usuarioCajaRespuesta } from 'src/app/module/usuario';

@Component({
  selector: 'app-aperturalista',
  templateUrl: './aperturalista.component.html',
  styleUrls: ['./aperturalista.component.css']
})
export class AperturalistaComponent implements OnInit, OnDestroy {
  closeResult = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  listaapertura: apertura[];
  aperturaNuevo = new aperturaNuevo();
  aperturaCerrar = new aperturaCerrar();
  id: number;
  usuario =new usuarioCajaRespuesta();
  @ViewChild('modalApertura') public templateModalapertura: TemplateRef<any>;
  constructor(private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private cajaService: CajaService,
    private aperturaService: AperturaService,

  ) { }

  ngOnInit(): void {
    this.listaapertura = [];
    this.id = 0;
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
        //scrollCollapse: false,
        scrollX: true,
      order: [],
      "columnDefs": [{
        "targets": 3,
        "orderable": false
      }],
    };
    this.ListaAperturas();
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

  ListaAperturas() {
    if (this.dtElement != null) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
      });
    }

    this.usuario= JSON.parse(localStorage.getItem('usuario'));
    this.aperturaService.GetAperturaxLocal_idxCaja_id(this.usuario.local_id, this.usuario.caja_id).subscribe({
      next: response => {

        this.listaapertura = response.data;
        this.dtTrigger.next(0);
      },
      complete: () => {
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
  }

  aperturar() {
    this.spinnerService.show();
    //var fechaini = moment(this.fechaini, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.usuario= JSON.parse(localStorage.getItem('usuario'));
    this.aperturaNuevo.caja_id = this.usuario.caja_id;
    this.aperturaNuevo.local_id = this.usuario.local_id;
    this.aperturaService.CreateApertura(this.aperturaNuevo).subscribe({
      next: response => {
        if (response.response) {
          this.toastr.success(response.message);
          this.ListaAperturas();
          this.modalService.dismissAll();
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

  openCerrar(id: number) {
    this.id = id;

  }

  cerrar() {
    this.spinnerService.show();
    this.usuario= JSON.parse(localStorage.getItem('usuario'));
    this.aperturaCerrar.id = this.id;
    this.aperturaCerrar.caja_id =this.usuario.caja_id;
    this.aperturaCerrar.local_id = this.usuario.local_id;
    this.aperturaService.CloseApertura(this.aperturaCerrar).subscribe({
      next: response => {
        if (response.response) {
          this.toastr.success(response.message);
          this.ListaAperturas();
          this.modalService.dismissAll();
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

  anular() {
    this.spinnerService.show();
    this.usuario= JSON.parse(localStorage.getItem('usuario'));
    this.aperturaCerrar.id = this.id;
    this.aperturaCerrar.caja_id =this.usuario.caja_id;
    this.aperturaCerrar.local_id = this.usuario.local_id;
    this.aperturaService.AnularApertura(this.aperturaCerrar).subscribe({
      next: response => {
        if (response.response) {
          this.toastr.success(response.message);
          this.ListaAperturas();
          this.modalService.dismissAll();
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
