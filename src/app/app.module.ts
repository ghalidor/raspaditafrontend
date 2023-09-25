import { NgModule,CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID, } from '@angular/core';
import { CommonModule,HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {NgbModule,NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { AlertModule,AlertConfig  } from 'ngx-bootstrap/alert';
import { BsDatepickerModule, BsDatepickerConfig,BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { PlantillaComponent } from './component/plantilla/plantilla.component';
import { LfooterComponent } from './component/lfooter/lfooter.component';
import { LheaderComponent } from './component/lheader/lheader.component';
import { LsidebarComponent } from './component/lsidebar/lsidebar.component';
import { AperturalistaComponent } from './component/apertura/aperturalista/aperturalista.component';
import { AperturanuevoComponent } from './component/apertura/aperturanuevo/aperturanuevo.component';
import { PuentojuegonuevoComponent } from './component/puntojuego/puentojuegonuevo/puentojuegonuevo.component';
import { PuentojuegolistaComponent } from './component/puntojuego/puentojuegolista/puentojuegolista.component';
import { CajalistaComponent } from './component/caja/cajalista/cajalista.component';
import { CajanuevoComponent } from './component/caja/cajanuevo/cajanuevo.component';
import { LocallistaComponent } from './component/local/locallista/locallista.component';
import { LocalnuevoComponent } from './component/local/localnuevo/localnuevo.component';
import { LocaleditarComponent } from './component/local/localeditar/localeditar.component';
import { CajaeditarComponent } from './component/caja/cajaeditar/cajaeditar.component';
import { PuentojuegoeditarComponent } from './component/puntojuego/puentojuegoeditar/puentojuegoeditar.component';
import { PuentojuegolocalComponent } from './component/puntojuego/puentojuegolocal/puentojuegolocal.component';
import { CajalocalComponent } from './component/caja/cajalocal/cajalocal.component';
import { TicketComponent } from './component/apertura/ticket/ticket.component';
import { GenerarticketComponent } from './component/apertura/generarticket/generarticket.component';
import { PagarticketsaldoComponent } from './component/apertura/pagarticketsaldo/pagarticketsaldo.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlantillaComponent,
    LfooterComponent,
    LheaderComponent,
    LsidebarComponent,
    AperturalistaComponent,
    AperturanuevoComponent,
    PuentojuegonuevoComponent,
    PuentojuegolistaComponent,
    CajalistaComponent,
    CajanuevoComponent,
    LocallistaComponent,
    LocalnuevoComponent,
    LocaleditarComponent,
    CajaeditarComponent,
    PuentojuegoeditarComponent,
    PuentojuegolocalComponent,
    CajalocalComponent,
    TicketComponent,
    GenerarticketComponent,
    PagarticketsaldoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataTablesModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule,
    NgSelectModule, 
    FormsModule,
    CommonModule,
    NgxSpinnerModule,
    TooltipModule.forRoot(),
    ToastrModule.forRoot({ progressBar: true,progressAnimation: 'decreasing',  preventDuplicates: true,}),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AlertConfig, BsDatepickerConfig,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(localeService: BsLocaleService){
    defineLocale('es', esLocale);
       localeService.use('es');
  }
  
  }
