import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cajaNuevo } from 'src/app/module/caja';
import { local } from 'src/app/module/local';
import { LocalService } from 'src/app/service/local/local.service';
import { CajaService } from 'src/app/service/caja/caja.service';

@Component({
  selector: 'app-cajanuevo',
  templateUrl: './cajanuevo.component.html',
  styleUrls: ['./cajanuevo.component.css']
})
export class CajanuevoComponent implements OnInit {
  caja = new cajaNuevo();
  listalocal: local[];
  @Input() padre;
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
      this.cajaService.CreateCaja(this.caja).subscribe({
        next: response => {
          if (response.response) {
            this.toastr.success(response.message);
            this.caja = new cajaNuevo();
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
