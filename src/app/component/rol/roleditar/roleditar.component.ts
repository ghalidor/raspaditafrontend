import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { rol, rolEditar, rolNuevo } from 'src/app/module/rol';
import { RolService } from 'src/app/service/rol/rol.service';

@Component({
  selector: 'app-roleditar',
  templateUrl: './roleditar.component.html',
  styleUrls: ['./roleditar.component.css']
})
export class RoleditarComponent implements OnInit {
  rol= new rol();
  rolEditar = new rolEditar();
  @Input() id;
  @Input() padre;
  onCreateForm = this.formBuilder.group({
    'nombre': ['', Validators.compose([
      Validators.required
    ]),],
    'estado': ['', Validators.compose([
      Validators.required
    ]),],
  });
  constructor(private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private rolService: RolService) { }

  ngOnInit(): void {
    this.detalle();
  }

  detalle() {
    this.rolService.GetDetalleRol(this.id).subscribe({
      next: response => {
        this.rol = response.data;
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

  guardar() {
    if (this.onCreateForm.valid) {
      this.spinnerService.show();
      this.rolEditar.id = this.rol.id;
      this.rolEditar.nombre = this.rol.nombre;
      this.rolEditar.estado = this.rol.estado;
      this.rolService.UpdateRol(this.rolEditar).subscribe({
        next: response => {
          if (response.response) {
            this.toastr.success(response.message);
            this.rol = new rol();
            this.padre.ListaRol();
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
