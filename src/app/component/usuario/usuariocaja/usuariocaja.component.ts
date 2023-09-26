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
import { local } from 'src/app/module/local';
import { LocalService } from 'src/app/service/local/local.service';
import { caja } from 'src/app/module/caja';
import { CajaService } from 'src/app/service/caja/caja.service';

@Component({
  selector: 'app-usuariocaja',
  templateUrl: './usuariocaja.component.html',
  styleUrls: ['./usuariocaja.component.css']
})
export class UsuariocajaComponent implements OnInit {
  closeResult = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  listalocal: local[];
  listacaja: caja[];
  listausuario: usuario[];

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
        "targets": 6,
        "orderable": false
      }],
    };
    this.ListaLocal();
    //this.ListaUsuario();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // ListaUsuario() {
  //   console.log(this.dtElement)
  //   if (this.dtElement != null) {
  //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       // Destroy the table first
  //       dtInstance.destroy();
  //       dtInstance.clear();
  //     });
  //   }
  //   this.usuarioService.GetUsuarios().subscribe({
  //     next: response => {
  //       this.listausuario = response.data;
  //       this.dtTrigger.next(0);
  //     },
  //     complete: () => {
  //       this.spinnerService.hide();
  //     },
  //     error: (error) => {
  //       this.spinnerService.hide();
  //     }
  //   });
  // }

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
    if (this.dtElement != null) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
      });
    }

    console.log(this.local_id)
    this.usuarioService.GetUsuariosxLocal_id(this.local_id).subscribe({
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

  agregar(usuarioId: number) {
    if (this.local_id != null && this.caja_id==null) {
      
    }
    else{

    }
  }
}
