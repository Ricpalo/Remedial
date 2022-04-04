import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  session = {
    fk_empresa: null
  }

  constructor(
    private servicio: RestService
  ) {
    this.obtenerDatos();
  }

  async obtenerDatos() {
    this.session = await this.servicio._session();
    console.log(this.session)
  }

  cerrar_sesion() {
    this.servicio.cerrarSesion();
  }

}
