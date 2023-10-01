import { Component, ViewChild, OnInit, OnDestroy, TemplateRef, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UsuarionuevoComponent } from '../usuarionuevo/usuarionuevo.component';
import { UsuarioeditarComponent } from '../usuarioeditar/usuarioeditar.component';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { usuario, usuarioCajaNuevo } from 'src/app/module/usuario';
import { local } from 'src/app/module/local';
import { LocalService } from 'src/app/service/local/local.service';
import { caja } from 'src/app/module/caja';
import { CajaService } from 'src/app/service/caja/caja.service';

@Component({
  selector: 'app-usuariocaja',
  templateUrl: './usuariocaja.component.html',
  styleUrls: ['./usuariocaja.component.css']
})
export class UsuariocajaComponent implements OnInit, OnDestroy, AfterViewInit {
  closeResult = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  listalocal: local[];
  listacaja: caja[];
  listausuario: usuario[];
  usuariocaja = new usuarioCajaNuevo();
  local_id: number;
  caja_id: number;
  constructor(private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    public localService: LocalService,
    private cajaService: CajaService,) { }

  ngOnInit(): void {
    this.listausuario = [];
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
        "targets": 6,
        "orderable": false
      }],
    };
    this.ListaLocal();
    this.rerender();
    //this.ListaUsuario();
  }

  rerender(): void {
    if (this.dtElement != null) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next(0);
      });
    }
  }

  reDraw(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear().draw(); // Add this  line to clear all rows..
      dtInstance.destroy();
      // dtTrigger la reconstruye
      this.dtTrigger.next(0);
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(0);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  ListaLocal() {
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
    if (this.local_id != null) {
      this.spinnerService.show();

      this.caja_id = null;
      this.cajaService.GetCajasxLocal_id(this.local_id).subscribe({
        next: response => {
          this.listacaja = response.data;
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
      this.toastr.warning("Seleccione Local");
    }
  }

  ListaUsuarioxCaja() {
    if (this.local_id != null && this.caja_id != null) {
      if (this.dtElement != null) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
        });
      }

      this.usuarioService.GetUsuarioxCaja_idTodosQuery(this.local_id, this.caja_id).subscribe({
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
    else {
      this.toastr.warning("Seleccione Local/Caja");
    }

  }

  agregar(usuarioId: number) {
    if (this.local_id != null && this.caja_id != null) {
      this.usuariocaja.caja_id = this.caja_id;
      this.usuariocaja.usuario_id = usuarioId;
      this.usuariocaja.local_id = this.local_id;
      this.usuarioService.CreateUsuarioCaja(this.usuariocaja).subscribe({
        next: response => {
          if (response.response) {
            this.toastr.success(response.message);
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
          this.ListaUsuarioxCaja();
        }
      })
    }
    else {
      this.reDraw();
      this.toastr.warning("Seleccione Local/Caja");
    }
  }
}
