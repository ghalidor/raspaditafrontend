import { Component, ViewChild, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { puntojuego, puntojuegoNuevo } from 'src/app/module/puntojuego';
import { PuentojuegonuevoComponent } from '../puentojuegonuevo/puentojuegonuevo.component';
import { PuntojuegoService } from './../../../service/puntojuego/puntojuego.service';
import { PuentojuegoeditarComponent } from '../puentojuegoeditar/puentojuegoeditar.component';
import { usuarioCajaNuevo, usuarioCajaRespuesta } from 'src/app/module/usuario';

@Component({
  selector: 'app-puentojuegolocal',
  templateUrl: './puentojuegolocal.component.html',
  styleUrls: ['./puentojuegolocal.component.css']
})
export class PuentojuegolocalComponent implements OnInit, OnDestroy {
  closeResult = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  listadispositivo: puntojuego[];
  usuario = new usuarioCajaRespuesta();
  constructor(
    private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private puntojuegoService: PuntojuegoService
  ) { }

  ngOnInit(): void {
    this.listadispositivo = [];
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
    this.ListaDispositivo();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ListaDispositivo() {
    this.spinnerService.show();
    if (this.dtElement != null) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
      });
    }
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.puntojuegoService.GetPuntoJuegoxLocal_id(this.usuario.local_id).subscribe({
      next: response => {
        this.listadispositivo = response.data;
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
