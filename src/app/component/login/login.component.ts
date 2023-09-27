import { Component, ViewChild, OnInit, OnDestroy, TemplateRef, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { UsuarioLogin, usuario, usuarioCajaNuevo } from 'src/app/module/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioLogin = new UsuarioLogin();
  onLoginForm = this.formBuilder.group({
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
  constructor(private spinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  Login() {
    this.spinnerService.show();
    this.usuarioService.UsuarioLogin(this.usuarioLogin).subscribe({
      next: response => {
        if (response.response) {
          this.toastr.success(response.message);
          this.usuarioLogin = new UsuarioLogin();
          localStorage.setItem('usuario', JSON.stringify(response.data));
          localStorage.setItem('token', response.token);
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['layout']);
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

}
