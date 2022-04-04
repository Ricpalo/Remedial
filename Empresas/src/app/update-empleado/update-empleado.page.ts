import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';


@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.page.html',
  styleUrls: ['./update-empleado.page.scss'],
})
export class UpdateEmpleadoPage implements OnInit {

  empleado_recibido = {
    id_usuario: "",
    nombre_usuario: "",
    apellidos_usuario: "",
    genero_usuario: "",
    email: "",
    password: ""
  }

  empleado = {
    id_usuario: "",
    nombre_usuario: "",
    apellidos_usuario: "",
    genero_usuario: "",
    email: "",
    password: ""
  }

  errores = {
    nombre_usuario: "",
    apellidos_usuario: "",
    genero_usuario: ""
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restService: RestService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.empleado_recibido = this.router.getCurrentNavigation().extras.state.empleado;
        this.empleado = this.empleado_recibido;
      } else {
        this.router.navigate(['empleados']);
      }
    });
  }

  updateEmpleado () {
    this.restService.ejecutar_put('usuarios/api/usuarios', this.empleado).subscribe(res => {
      if ( this.empleado.nombre_usuario == "" ) {
        this.errores.nombre_usuario = "El campo nombre no puede ir vacío";
      }

      if ( this.empleado.apellidos_usuario == "" ) {
        this.errores.apellidos_usuario = "El campo apellidos no puede ir vacío";
      }

      if ( this.empleado.genero_usuario == "" ) {
        this.errores.genero_usuario = "El campo genero no puede ir vacío";
      }

      if ( this.empleado.nombre_usuario != "" && this.empleado.apellidos_usuario != "" && this.empleado.genero_usuario != "" ) {
        this.router.navigate(['empleados']);
      }
    })
  }

}
