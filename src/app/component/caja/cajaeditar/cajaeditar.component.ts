import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { caja, cajaEditar } from 'src/app/module/caja';
import { local } from 'src/app/module/local';
import { LocalService } from 'src/app/service/local/local.service';
import { CajaService } from 'src/app/service/caja/caja.service';

@Component({
  selector: 'app-cajaeditar',
  templateUrl: './cajaeditar.component.html',
  styleUrls: ['./cajaeditar.component.css']
})
export class CajaeditarComponent implements OnInit {
  cajaEditar = new cajaEditar();
  caja = new caja();
  listalocal: local[];
  @Input() padre;
  @Input() id;
  onCreateForm = this.formBuilder.group({
    'nombre': ['', Validators.compose([
      Validators.required
    ]),],
    'local_id': ['', Validators.compose([
      Validators.required
    ])],
  });
  constructor(private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public localService: LocalService,
    public cajaService: CajaService) { }

  ngOnInit(): void {
    this.ListaLocal();
    this.detalle();
  }

  detalle() {
    this.spinnerService.show();
    this.cajaService.GetDetalleCaja(this.id).subscribe({
      next: response => {
        this.caja = response.data;
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
      this.cajaEditar.id = this.caja.id;
      this.cajaEditar.local_id = this.caja.local_id;
      this.cajaEditar.nombre = this.caja.nombre;
      this.cajaEditar.estado = this.caja.estado;
      this.cajaService.UpdateCaja(this.cajaEditar).subscribe({
        next: response => {
          if (response.response) {
            this.toastr.success(response.message);
            this.caja = new caja();
            this.padre.ListaCaja();
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
