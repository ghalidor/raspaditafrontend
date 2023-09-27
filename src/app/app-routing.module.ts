import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantillaComponent } from './component/plantilla/plantilla.component';
import { CajalistaComponent } from './component/caja/cajalista/cajalista.component';
import { AperturalistaComponent } from './component/apertura/aperturalista/aperturalista.component';
import { LocallistaComponent } from './component/local/locallista/locallista.component';
import { PuentojuegolistaComponent } from './component/puntojuego/puentojuegolista/puentojuegolista.component';
import { PuentojuegolocalComponent } from './component/puntojuego/puentojuegolocal/puentojuegolocal.component';
import { CajalocalComponent } from './component/caja/cajalocal/cajalocal.component';
import { TicketComponent } from './component/apertura/ticket/ticket.component';
import { ResumendiaComponent } from './component/reporte/resumendia/resumendia.component';
import { RollistaComponent } from './component/rol/rollista/rollista.component';
import { UsuariolistaComponent } from './component/usuario/usuariolista/usuariolista.component';
import { UsuariocajaComponent } from './component/usuario/usuariocaja/usuariocaja.component';
import { LoginComponent } from './component/login/login.component';


const routes: Routes = [ { path: '', redirectTo: '/plantilla', pathMatch: 'full' },
{ path: 'plantilla', component: PlantillaComponent},
{ path: 'login', component: LoginComponent},

{ path: 'ticket', component: TicketComponent},
{ path: 'apertura', component: AperturalistaComponent},
{ path: 'cajalocal', component: CajalocalComponent},
{ path: 'dispositivolocal', component: PuentojuegolocalComponent},

{ path: 'resumendia', component: ResumendiaComponent},

{ path: 'caja', component: CajalistaComponent},
{ path: 'local', component: LocallistaComponent},
{ path: 'dispositivo', component: PuentojuegolistaComponent},

{ path: 'roles', component: RollistaComponent},
{ path: 'usuarios', component: UsuariolistaComponent},
{ path: 'usuariocaja', component: UsuariocajaComponent},

//{ path: 'dispositivo', component: },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
