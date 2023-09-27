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
import { usuarioCajaNuevo, usuarioCajaRespuesta } from 'src/app/module/usuario';

@Component({
  selector: 'app-cajalocal',
  templateUrl: './cajalocal.component.html',
  styleUrls: ['./cajalocal.component.css']
})
export class CajalocalComponent implements OnInit,OnDestroy {
  closeResult = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  listacaja: caja[];
  listalocal: local[];
  usuario =new usuarioCajaRespuesta();
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
        "targets": 3,
        "orderable": false
      }],
    };
    this.ListaCaja();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ListaCaja() {
    if (this.dtElement != null) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
      });
    }
  
    this.usuario= JSON.parse(localStorage.getItem('usuario'));
    this.cajaService.GetCajasxLocal_id(this.usuario.local_id).subscribe({
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

}
