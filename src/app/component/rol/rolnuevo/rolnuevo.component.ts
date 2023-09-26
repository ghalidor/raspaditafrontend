import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { rolNuevo } from 'src/app/module/rol';
import { RolService } from 'src/app/service/rol/rol.service';

@Component({
  selector: 'app-rolnuevo',
  templateUrl: './rolnuevo.component.html',
  styleUrls: ['./rolnuevo.component.css']
})
export class RolnuevoComponent implements OnInit {
  rol = new rolNuevo();
  @Input() padre;
  onCreateForm = this.formBuilder.group({
    'nombre': ['', Validators.compose([
      Validators.required
    ]),],
  });

  constructor(private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private rolService:RolService) { }

  ngOnInit(): void {
  }

  guardar() {
    if (this.onCreateForm.valid) {
      this.spinnerService.show();
      this.rolService.CreateRol(this.rol).subscribe({
        next: response => {
          if (response.response) {
            this.toastr.success(response.message);
            this.rol = new rolNuevo();
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
