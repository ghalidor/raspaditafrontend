import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { rol, rolNuevo } from 'src/app/module/rol';
import { RolService } from 'src/app/service/rol/rol.service';
import { local } from 'src/app/module/local';
import { LocalService } from 'src/app/service/local/local.service';
import { usuario, usuarioEditar, usuarioNuevo } from 'src/app/module/usuario';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-usuarioeditar',
  templateUrl: './usuarioeditar.component.html',
  styleUrls: ['./usuarioeditar.component.css']
})
export class UsuarioeditarComponent implements OnInit {
  listarol: rol[];
  listalocal: local[];

  usuario = new usuario();
  usuarioEditar = new usuarioEditar();
  @Input() padre;
  @Input() id;
  onCreateForm = this.formBuilder.group({
    'local_id': ['', Validators.compose([
      Validators.required
    ]),],
    'rol_id': ['', Validators.compose([
      Validators.required
    ]),],
    'nombre': ['', Validators.compose([
      Validators.required
    ]),],
    'password': ['', Validators.compose([
      Validators.required
    ]),],
  });
  constructor(
    private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private localService:LocalService,
    private rolService:RolService,
    private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.listalocal=[];
    this.listarol=[];
    this.ListaRol();
    this.ListaLocal();
    this.detalle();
  }

  detalle() {
    this.spinnerService.show();
    this.usuarioService.GetDetalleUsuario(this.id).subscribe({
      next: response => {
        this.usuario = response.data;
        //console.log(this.local);
      },
      complete: () => {
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })

  }

  ListaRol() {

    this.rolService.GetRoles().subscribe({
      next: response => {
        this.listarol = response.data;
      },
      complete: () => {
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
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

  guardar() {
    if (this.onCreateForm.valid) {
      this.spinnerService.show();
      this.usuarioEditar.id = this.id;
      this.usuarioEditar.nombre = this.usuario.nombre;
      this.usuarioEditar.local_id = this.usuario.local_id;
      this.usuarioEditar.rol_id = this.usuario.rol_id;
      this.usuarioEditar.estado = this.usuario.estado;
      this.usuarioService.UpdateUsuario(this.usuarioEditar).subscribe({
        next: response => {
          if (response.response) {
            this.toastr.success(response.message);
            this.usuario = new usuario();
            this.padre.ListaUsuario();
            this.activeModal.close();
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
    else {
      this.toastr.warning("Complete los campos obligatorios");
    }
  }
}
