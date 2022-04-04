import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RestService } from './rest.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{

  constructor(
    public servicio : RestService
  ) {

  }
  canActivate():boolean{
    return this.servicio.validarSesion();
  }
}
