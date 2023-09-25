import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { puntojuego, puntojuegoEditar, puntojuegoNuevo } from 'src/app/module/puntojuego';
import { local } from 'src/app/module/local';
import { LocalService } from 'src/app/service/local/local.service';
import { PuntojuegoService } from 'src/app/service/puntojuego/puntojuego.service';

@Component({
  selector: 'app-puentojuegoeditar',
  templateUrl: './puentojuegoeditar.component.html',
  styleUrls: ['./puentojuegoeditar.component.css']
})
export class PuentojuegoeditarComponent implements OnInit {
  dispositivoEditar = new puntojuegoEditar();
  dispositivo = new puntojuego();
  listalocal: local[];
  @Input() padre;
  @Input() id;
  onCreateForm = this.formBuilder.group({
    'local_id': ['', Validators.compose([
      Validators.required
    ])],
    'nro_punto': ['', Validators.compose([
      Validators.required
    ]),],
    'ip': ['', Validators.compose([
      Validators.required
    ])],
  });
  constructor(private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public localService: LocalService,
    private puntojuegoService: PuntojuegoService) { }

  ngOnInit(): void {
    this.ListaLocal();
    this.detalle();
  }

  detalle() {
    this.spinnerService.show();
    this.puntojuegoService.GetDetallePuntoJuego(this.id).subscribe({
      next: response => {
        this.dispositivo = response.data;
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
      this.dispositivoEditar.id = this.dispositivo.id;
      this.dispositivoEditar.local_id = this.dispositivo.local_id;
      this.dispositivoEditar.nro_punto = this.dispositivo.nro_punto;
      this.dispositivoEditar.ip = this.dispositivo.ip;
      this.dispositivoEditar.estado = this.dispositivo.estado;
      this.puntojuegoService.UpdatePuntoJuego(this.dispositivoEditar).subscribe({
        next: response => {
          if (response.response) {
            this.toastr.success(response.message);
            this.dispositivoEditar = new puntojuegoEditar();
            this.padre.ListaDispositivo();
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
