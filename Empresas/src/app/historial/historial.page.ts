import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  asistencias = []
  
  session = {
    key: ""
  }

  empresa = {
    id_empresa: "",
    nombre: ""
  }

  constructor(
    private servicio: RestService,
    private loadingController: LoadingController,
    private router: Router
  ) { this.obtenerDatos() }

  async obtenerDatos() {
    this.session = await this.servicio._session();
  }

  cerrar_sesion() {
    this.servicio.cerrarSesion();
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    })
      
    this.servicio.ejecutar_get('asistencias/api/asistencias', {"id_usuario": this.session.key}).subscribe(res => {
      this.asistencias = res.datos;
      console.log(this.asistencias)
    });
  }
}
