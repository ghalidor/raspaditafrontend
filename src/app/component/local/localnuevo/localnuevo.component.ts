import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { localNuevo } from 'src/app/module/local';
import { LocalService } from 'src/app/service/local/local.service';
@Component({
  selector: 'app-localnuevo',
  templateUrl: './localnuevo.component.html',
  styleUrls: ['./localnuevo.component.css']
})
export class LocalnuevoComponent implements OnInit {
  local = new localNuevo();
  @Input() padre;
  onCreateForm = this.formBuilder.group({
    'nombre': ['', Validators.compose([
      Validators.required
    ]),],
    'direccion': ['', Validators.compose([
      Validators.required
    ])],
  });

  constructor(
    private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public localService: LocalService,) { }

  ngOnInit(): void {
  }

  guardar() {
    if (this.onCreateForm.valid) {
      this.spinnerService.show();
      this.localService.CreateLocal(this.local).subscribe({
        next: response => {
          if (response.response) {
            this.toastr.success(response.message);
            this.local = new localNuevo();
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
