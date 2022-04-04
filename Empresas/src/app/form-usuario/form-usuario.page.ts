import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.page.html',
  styleUrls: ['./form-usuario.page.scss'],
})
export class FormUsuarioPage implements OnInit {
  usuario = {
    id_usuario: null,
    email : "",
    nombres : "",
    apellidos : "",
    genero : "",
    password : "",
    password_confirm : "",
    fk_empresa : ""
  }

  empresa = {
    nombre: "",
    telefono: "",
    fk_usuario : ""
  }

  empresas = []
  usuarios = []

  empleado = false
  fk_empresa = null

  errores = {
    email : "",
    nombres: "",
    apellidos: "",
    genero: "",
    password: "",
    password_confirm: ""
  }

  constructor(
    private restService : RestService,
    private modalController: ModalController,
    private toastController: ToastController,
    private router: Router,
    private servicio: RestService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    })

    this.servicio.ejecutar_get('empresas/api/empresas', {}).subscribe(res => {
      this.empresas = res.datos;
      console.log(this.empresas)
    });

    this.servicio.ejecutar_get('usuarios/api/usuarios', {}).subscribe(res => {
      this.usuarios = res.datos;
      
      this.usuario.id_usuario = this.usuarios.length + 1
    });
  }

  registrarUsuario () {
    let formulario = new FormData();
    formulario.append('email',this.usuario.email);
    formulario.append('nombres',this.usuario.nombres);
    formulario.append('apellidos',this.usuario.apellidos);
    formulario.append('genero',this.usuario.genero);
    formulario.append('password',this.usuario.password);

    if ( this.usuario.password != this.usuario.password_confirm ) {
      this.showToast('Passwords no coinciden');
    } 

    this.restService.subida_ficheros_y_datos('usuarios/api/usuario', formulario).subscribe(result => {
      if(result.status == "0") {
        if (result.errores.email == 'The E-mail field must contain a unique value.') {
          this.errores.email = "Este correo ya fue ingresado, por favor utiliza otro";
        } else if (result.errores.email != null) {
          this.errores.email = "Por favor, ingresa el correo";
        } 
        
        if (result.errores.nombres != null) {
          this.errores.nombres = "Por favor, ingresa los nombres";
        } 
        
        if (result.errores.apellidos != null) {
          this.errores.apellidos = "Por favor, ingresa los apellidos";
        }  
        
        if (result.errores.genero != null) {
          this.errores.genero = "Por favor, ingresa el genero";
        }  
        
        if (result.errores.password != null) {
          this.errores.password = "Por favor, ingresa el password";
        }

        if (this.usuario.password_confirm == null) {
          this.errores.password_confirm = "Por favor, repite el password";
        }
      } else {
        for (let i = 0; i < this.empresas.length; i++) {
          if (this.empresas[i].nombre == this.empresa.nombre) {
            this.empleado = true;
            this.usuario.fk_empresa = this.empresas[i].id_empresa;
            break;
          }
        }

        if (this.empleado) {
          let formulario = new FormData();
          formulario.append('nombre',this.empresa.nombre);
          formulario.append('telefono',this.empresa.telefono);
          formulario.append('fk_usuario',this.usuario.id_usuario);

          this.restService.subida_ficheros_y_datos('empresas/api/empresas', formulario).subscribe(res => {
            this.restService.ejecutar_put('usuarios/api/usuarios', this.usuario).subscribe(res => {
              this.restService.mostrar_toast("Exito","success","Registrado como empleado", "top", 5000);
              this.closeModal();
            });
          });

        } else {
          let formulario = new FormData();
          formulario.append('nombre',this.empresa.nombre);
          formulario.append('telefono',this.empresa.telefono);
          formulario.append('fk_usuario',this.usuario.id_usuario);

          this.restService.subida_ficheros_y_datos('empresas/api/empresas', formulario).subscribe(res => {
            this.restService.mostrar_toast("Exito","success","Registrado como administrador de empresa", 0, 5000);
            this.closeModal();
          });
        }
      }
    });
  }

  closeModal(){
    this.modalController.dismiss({
      'dismissed': true
    }
    );
  }

  async showToast(msg) {
    let toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}

