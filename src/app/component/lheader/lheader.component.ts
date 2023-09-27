import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuarioCajaNuevo, usuarioCajaRespuesta } from 'src/app/module/usuario';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.datos();
  }



  datos() {
    this.usuario= JSON.parse(localStorage.getItem('usuario'));
    this.usu_nombre=this.usuario.nombre;
    this.local=this.usuario.local_nombre;
    this.caja=this.usuario.caja_nombre;
console.log(this.usuario);
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    //localStorage.clear();
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['login']);
  }
}
