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
import { CajaComponent } from './component/caja/caja.component';
import { PuntoJuegoComponent } from './component/punto-juego/punto-juego.component';
import { LocalComponent } from './component/local/local.component';
import { LfooterComponent } from './component/lfooter/lfooter.component';
import { LheaderComponent } from './component/lheader/lheader.component';
import { LsidebarComponent } from './component/lsidebar/lsidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlantillaComponent,
    CajaComponent,
    PuntoJuegoComponent,
    LocalComponent,
    LfooterComponent,
    LheaderComponent,
    LsidebarComponent
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
