import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuarioCajaNuevo, usuarioCajaRespuesta } from 'src/app/module/usuario';
import { Subscription, timer } from 'rxjs';
import { map, share } from "rxjs/operators";
import * as moment from 'moment';

@Component({
  selector: 'app-lheader',
  templateUrl: './lheader.component.html',
  styleUrls: ['./lheader.component.css']
})
export class LheaderComponent implements OnInit {
  usu_nombre: String;
  fechahora: string;
  local: string;
  caja: string;
  usuario =new usuarioCajaRespuesta();
  time = new Date();
  moment = moment;
  subscription: Subscription;
  fecha:string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.datos();
    this.subscription = timer(0, 1000)
    .pipe(
      map(() => new Date()),
      share()
    )
    .subscribe(time => {
      this.time = time;
      if(this.fecha!=moment(this.time).format("DD-MM-yyyy")){
        this.fecha=moment(this.time).format("DD-MM-yyyy hh:mm:ss a");

      } 
      //console.log(this.time);
    });
  }



  datos() {
    this.usuario= JSON.parse(localStorage.getItem('usuario'));
    this.usu_nombre=this.usuario.nombre;
    this.local=this.usuario.local_nombre;
    this.caja=this.usuario.caja_nombre;

  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    //localStorage.clear();
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['login']);
  }
}
