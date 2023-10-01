import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  vista: string;
  respuesta: boolean;
  constructor(private SpinnerService: NgxSpinnerService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var uri = route.routeConfig;
    this.vista = String(uri?.path);
    console.log(uri?.path)
    return true;
  }

}
