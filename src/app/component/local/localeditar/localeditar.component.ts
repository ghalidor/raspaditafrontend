import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { localNuevo, localEditar, local } from 'src/app/module/local';
import { LocalService } from 'src/app/service/local/local.service';

@Component({
  selector: 'app-localeditar',
  templateUrl: './localeditar.component.html',
  styleUrls: ['./localeditar.component.css']
})
export class LocaleditarComponent implements OnInit {
  local = new local();
  localEditar = new localEditar();
  @Input() padre;
  @Input() id;
  onCreateForm = this.formBuilder.group({
    'nombre': ['', Validators.compose([
      Validators.required
    ]),],
    'direccion': ['', Validators.compose([
      Validators.required
    ])],
    'estado': ['', Validators.compose([
      Validators.required
    ]),],
  });
  constructor(private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public localService: LocalService) { }

  ngOnInit(): void {
    this.detalle();
  }

  detalle() {
    this.spinnerService.show();
    this.localService.GetDetalleLocal(this.id).subscribe({
      next: response => {
        this.local = response.data;
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
      this.localEditar.id = this.local.id;
      this.localEditar.nombre = this.local.nombre;
      this.localEditar.direccion = this.local.direccion;
      this.localEditar.estado = this.local.estado;
      this.localService.UpdateLocal(this.localEditar).subscribe({
        next: response => {
          if (response.response) {
            this.toastr.success(response.message);
            this.padre.ListaLocal();
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
