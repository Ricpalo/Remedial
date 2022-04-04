import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-empleado',
  templateUrl: './add-empleado.page.html',
  styleUrls: ['./add-empleado.page.scss'],
})
export class AddEmpleadoPage implements OnInit {

  session = {
    key : ""
  }
  
  empleado = {
    id_usuario: null,
    nombre: "",
    apellidos: "",
    genero: "",
    fk_empresa:"",
    email: "",
  }

  errores = {
    nombre: "",
    apellidos: "",
    genero: "",
    email: ""
  }

  empleados = []
  empresa = {id_empresa: ""}

  constructor(
    private restService: RestService,
    private router: Router,
    private loadingController: LoadingController
  ) { this.obtenerDatos(); }

  async obtenerDatos() {
    this.session = await this.restService._session();
  }

  cerrar_sesion() {
    this.restService.cerrarSesion();
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando',
      duration: 2000
    })

    await loading.present();

    this.restService.ejecutar_get('empresas/api/empresas', {"fk_usuario": this.session.key}).subscribe(res => {
      this.empresa = res.datos;
      this.empleado.fk_empresa = this.empresa.id_empresa;
    });

    this.restService.ejecutar_get('usuarios/api/usuarios', {}).subscribe(res => {
        this.empleados = res.datos;
        this.empleado.id_usuario = this.empleados.length + 1;
      });
  }

  async addEmpleado() {
    let formulario = new FormData();

    formulario.append("nombres", this.empleado.nombre);
    formulario.append("apellidos", this.empleado.apellidos);
    formulario.append("genero", this.empleado.genero);
    formulario.append("email", this.empleado.email);

    let password = Math.random().toString(36).substr(2, 8);

    formulario.append("password", password);

    this.restService.subida_ficheros_y_datos('usuarios/api/usuario', formulario).subscribe(res => {
      if (res.status == "0") {
        if (res.errores.nombres != null) {
          this.errores.nombre = "El campo nombre es requerido";
        }

        if (res.errores.apellidos != null) {
          this.errores.apellidos = "El campo apellidos es requerido";
        }

        if (res.errores.genero != null) {
          this.errores.genero = "El campo genero es requerido";
        }

        if (res.errores.email != null) {
          this.errores.email = "El campo email es requerido";
        }
      } else {
        this.restService.ejecutar_put('usuarios/api/usuarios', this.empleado).subscribe(res=>{
          this.restService.mostrar_toast("Password", "success", "La contraseña es: " + password, "top", 10000);
          this.router.navigate(['empleados']);
        })
      }
    });
  }

}
