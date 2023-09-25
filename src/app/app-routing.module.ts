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


const routes: Routes = [ { path: '', redirectTo: '/plantilla', pathMatch: 'full' },
{ path: 'plantilla', component: PlantillaComponent},
{ path: 'ticket', component: TicketComponent},
{ path: 'apertura', component: AperturalistaComponent},
{ path: 'cajalocal', component: CajalocalComponent},
{ path: 'dispositivolocal', component: PuentojuegolocalComponent},

{ path: 'caja', component: CajalistaComponent},
{ path: 'local', component: LocallistaComponent},
{ path: 'dispositivo', component: PuentojuegolistaComponent},


//{ path: 'dispositivo', component: },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
