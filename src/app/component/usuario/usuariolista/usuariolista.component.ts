import { Component, ViewChild, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UsuarionuevoComponent } from '../usuarionuevo/usuarionuevo.component';
import { UsuarioeditarComponent } from '../usuarioeditar/usuarioeditar.component';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { usuario } from 'src/app/module/usuario';

@Component({
  selector: 'app-usuariolista',
  templateUrl: './usuariolista.component.html',
  styleUrls: ['./usuariolista.component.css']
})
export class UsuariolistaComponent implements OnInit ,OnDestroy{
  closeResult = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listausuario: usuario[];

  constructor(private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.listausuario=[];
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
    this.ListaUsuario();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ListaUsuario() {
    if (this.dtElement != null) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
      });
    }
  
    //var fechaini = moment(this.fechaini, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.usuarioService.GetUsuarios().subscribe({
      next: response => {
        this.listausuario = response.data;
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
    const modalRef = this.modalService.open(UsuarionuevoComponent, { size: 'sm' });
    modalRef.componentInstance.padre=this;
  }

  modalDetalle(id:number) {
    const modalRef = this.modalService.open(UsuarioeditarComponent, { size: 'sm' });
    modalRef.componentInstance.id=id;
    modalRef.componentInstance.padre=this;
  }

}
