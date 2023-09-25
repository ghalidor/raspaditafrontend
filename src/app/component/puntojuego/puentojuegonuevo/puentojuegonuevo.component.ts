import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { puntojuegoNuevo } from 'src/app/module/puntojuego';
import { local } from 'src/app/module/local';
import { LocalService } from 'src/app/service/local/local.service';
import { PuntojuegoService } from 'src/app/service/puntojuego/puntojuego.service';

@Component({
  selector: 'app-puentojuegonuevo',
  templateUrl: './puentojuegonuevo.component.html',
  styleUrls: ['./puentojuegonuevo.component.css']
})
export class PuentojuegonuevoComponent implements OnInit {
  dispositivo = new puntojuegoNuevo();
  listalocal: local[];
  @Input() padre;
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
  constructor(
    private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public localService: LocalService,
    private puntojuegoService: PuntojuegoService,) { }

  ngOnInit(): void {
    this.ListaLocal();
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
      this.puntojuegoService.CreatePuntoJuego(this.dispositivo).subscribe({
        next: response => {
          if (response.response) {
            this.toastr.success(response.message);
            this.dispositivo = new puntojuegoNuevo();
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
