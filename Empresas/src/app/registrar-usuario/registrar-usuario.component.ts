import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss'],
})
export class RegistrarUsuarioComponent implements OnInit {

  usuario = {
    email : "",
    nombres : "",
    apellidos : "",
    genero : "",
    password : "",
    password_confirm : ""
  }

  constructor(
    private restService : RestService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  registrarUsuario () {
    let formulario = new FormData();
    formulario.append('email',this.usuario.email);
    formulario.append('nombres',this.usuario.nombres);
    formulario.append('apellidos',this.usuario.apellidos);
    formulario.append('genero',this.usuario.genero);
    formulario.append('password',this.usuario.password);
    formulario.append('password_confirm',this.usuario.password_confirm);

    if ( this.usuario.password != this.usuario.password_confirm ) {
      this.showToast('Passwords no coinciden');
    } else {
      this.restService.ejecutar_post('usuarios/api/usuario',formulario).subscribe(result => {
        console.log(result);
      });
    }
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
