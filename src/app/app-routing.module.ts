import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantillaComponent } from './component/plantilla/plantilla.component';
import { CajaComponent } from './component/caja/caja.component';

const routes: Routes = [ { path: '', redirectTo: '/plantilla', pathMatch: 'full' },
{ path: 'plantilla', component: PlantillaComponent},
{ path: 'caja', component: CajaComponent},
//{ path: 'dispositivo', component: },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
