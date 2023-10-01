import { Component, ViewChild, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { rol } from 'src/app/module/rol';
import { RolService } from 'src/app/service/rol/rol.service';
import { RolnuevoComponent } from '../rolnuevo/rolnuevo.component';
import { RoleditarComponent } from '../roleditar/roleditar.component';

@Component({
  selector: 'app-rollista',
  templateUrl: './rollista.component.html',
  styleUrls: ['./rollista.component.css']
})
export class RollistaComponent implements OnInit, OnDestroy {
  closeResult = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listarol: rol[];
  constructor(private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private rolService: RolService) { }

  ngOnInit(): void {
    this.listarol = [];
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
        "targets": 4,
        "orderable": false
      }],
    };
    this.ListaRol();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ListaRol() {
    if (this.dtElement != null) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
      });
    }

    //var fechaini = moment(this.fechaini, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.rolService.GetRoles().subscribe({
      next: response => {
        this.listarol = response.data;
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
    const modalRef = this.modalService.open(RolnuevoComponent, { size: 'sm' });
    modalRef.componentInstance.padre = this;
  }

  modalDetalle(id: number) {
    const modalRef = this.modalService.open(RoleditarComponent, { size: 'sm' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.padre = this;
  }

}
