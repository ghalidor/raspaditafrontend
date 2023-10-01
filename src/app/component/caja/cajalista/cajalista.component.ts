import { Component, ViewChild, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { caja } from 'src/app/module/caja';
import { CajaService } from 'src/app/service/caja/caja.service';
import { local } from 'src/app/module/local';
import { LocalService } from 'src/app/service/local/local.service';
import { CajanuevoComponent } from '../cajanuevo/cajanuevo.component';
import { CajaeditarComponent } from '../cajaeditar/cajaeditar.component';

@Component({
  selector: 'app-cajalista',
  templateUrl: './cajalista.component.html',
  styleUrls: ['./cajalista.component.css']
})
export class CajalistaComponent implements OnInit,OnDestroy {
  closeResult = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  listacaja: caja[];
  listalocal: local[];
  constructor(private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private cajaService:CajaService,
    private localService:LocalService) { }

  ngOnInit(): void {
    this.listalocal=[];
    this.listacaja=[];
    this.dtOptions = {
      destroy: true,
      pagingType: 'first_last_numbers',
      pageLength: 10,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
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
        "targets": 5,
        "orderable": false
      }],
    };
    this.ListaCaja();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  open(modal: TemplateRef<any>,tamanio:string) {
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

  ListaLocal() {
    this.spinnerService.show();
    //var fechaini = moment(this.fechaini, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.localService.GetLocales().subscribe({
      next: response => {
        this.listalocal = response.data;
      },
      complete: () => {
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
  }

  ListaCaja() {
    if (this.dtElement != null) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
      });
    }
    this.spinnerService.show();
    //var fechaini = moment(this.fechaini, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.cajaService.GetCajas().subscribe({
      next: response => {
        this.listacaja = response.data;
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

  modalNuevo() {
    const modalRef = this.modalService.open(CajanuevoComponent, { size: 'md' });
    modalRef.componentInstance.padre=this;
  }

  modalDetalle(id:number) {
    const modalRef = this.modalService.open(CajaeditarComponent, { size: 'md' });
    modalRef.componentInstance.id=id;
    modalRef.componentInstance.padre=this;
  }

}
