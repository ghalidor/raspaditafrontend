import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpUserEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, throwError } from "rxjs";
import { tap, catchError } from 'rxjs/operators';
import { usuarioCajaNuevo, usuarioCajaRespuesta } from 'src/app/module/usuario';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
    usuario =new usuarioCajaRespuesta();
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private spinnerService: NgxSpinnerService,
        private router: Router, private modalService: NgbModal,
        private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // var informacion=JSON.parse(String(localStorage.getItem("usuario")));
        // var empresa_id=String(0);
        // if(informacion!=null){
        //   empresa_id= informacion.empresa_id;
        // }
        //console.log(empresa_id)
        this.usuario= JSON.parse(localStorage.getItem('usuario'));
        const clonedreq = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + this.usuario.token)
        });
        const startTime = (new Date()).getTime();
        return next.handle(clonedreq).pipe(
            tap({
                next: (event) => {
                    if (event instanceof HttpResponse) {

                    }
                },
                error: (error: HttpErrorResponse) => {
                    switch (error.status) {
                        case 404: {
                            return `Not Found: ${error.message}`;
                        }
                        case 401: {
                            this.toastr.clear();
                            this.toastr.error("No tiene Permiso,Comuniquese con el Administrador");
                            this.spinnerService.hide();
                            console.log(this.router.url);
                            this.router.navigateByUrl('/login');
                            return `Access Denied: ${error.message}`;
                        }
                        case 419: {
                            this.toastr.clear();
                            this.toastr.error("Su sesión expiró");
                            this.spinnerService.hide();
                            this.modalService.dismissAll();
                            this.router.navigateByUrl('/login');
                            return `Access Denied: ${error.message}`;
                        }
                        case 500: {
                            return `Internal Server Error: ${error.message}`;
                        }
                        default: {
                            this.toastr.error(error.message);
                            console.log("Error de Conexion")
                            return `Unknown Server Error: ${error.message}`;
                        }

                    }
                    throw error;
                }
            })
        )

    }
} 