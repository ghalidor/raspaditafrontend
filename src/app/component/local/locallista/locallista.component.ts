import { Component, ViewChild, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { local } from 'src/app/module/local';
import { LocalService } from 'src/app/service/local/local.service';
import { LocalnuevoComponent } from '../localnuevo/localnuevo.component';
import { LocaleditarComponent } from '../localeditar/localeditar.component';

@Component({
  selector: 'app-locallista',
  templateUrl: './locallista.component.html',
  styleUrls: ['./locallista.component.css']
})
export class LocallistaComponent implements OnInit,OnDestroy {
  closeResult = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listalocal: local[];
  constructor(private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private localService:LocalService) { }

  ngOnInit(): void {
    this.listalocal=[];
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
      order: [],
      "columnDefs": [{
        "targets": 5,
        "orderable": false
      }],
    };
    this.ListaLocal();
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
    if (this.dtElement != null) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
      });
    }
  
    //var fechaini = moment(this.fechaini, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.localService.GetLocales().subscribe({
      next: response => {
        this.listalocal = response.data;
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
    const modalRef = this.modalService.open(LocalnuevoComponent, { size: 'md' });
    modalRef.componentInstance.padre=this;
  }

  modalDetalle(id:number) {
    const modalRef = this.modalService.open(LocaleditarComponent, { size: 'md' });
    modalRef.componentInstance.id=id;
    modalRef.componentInstance.padre=this;
  }
}
