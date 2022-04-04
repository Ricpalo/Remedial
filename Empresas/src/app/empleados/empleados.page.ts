import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router'; 

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleados = []
  
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

    this.servicio.ejecutar_get('empresas/api/empresas', {"id": this.session.key}).subscribe(res => {
      this.empresa = res.datos;
      console.log(this.empresa)
      
      this.servicio.ejecutar_get('usuarios/api/usuarios', {"fk_empresa": this.empresa.id_empresa}).subscribe(res => {
        this.empleados = res.datos;
        console.log(this.empleados)
      });
    });
  }

  updateEmpleado(empleado) {
    let parametros: NavigationExtras = {
      state: {
        empleado: empleado
      }
    };

    this.router.navigate(['update-empleado'], parametros);
  }
}
