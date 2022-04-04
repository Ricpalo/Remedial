import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { FormUsuarioPage } from '../form-usuario/form-usuario.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  error: string;

  usuario = {
    pEmail : "",
    pPassword : ""
  };

  constructor(
    private servicio: RestService,
    private loadingController: LoadingController,
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private restService : RestService,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
    
  }

  async iniciar_sesion(){

    const loading = await this.loadingController.create({
      message: 'Autenticando'
    })

    this.servicio.ejecutar_post('usuarios/api/login', this.usuario).subscribe(res => {
      loading.dismiss();
      if (res.status == '1') {
        this.servicio.mostrar_toast(
          "Almacen UP",
          "success",
          "Bienvenido " + res.datos.nombre_completo,
          "top",
          4000
        );

        this.servicio.iniciarSesion(res.datos);
      } else if (res.status == '0') {
        this.servicio.mostrar_toast(
          "Almacen UP",
          "danger",
          res.mensaje,
          "top",
          4000
        );
      } else {
        this.servicio.mostrar_toast(
          "Almacen UP",
          "danger",
          "Ocurrio un error de comunicacion",
          "top",
          4000
        );
      }
    }, error => {
      loading.dismiss();
      this.servicio.mostrar_toast(
        "Almacen UP",
        "danger",
        "Ocurrio un error interno",
        "top",
        4000
      );
    });

    // this.servicio.iniciarSesion(this.usuario);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FormUsuarioPage,
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8, 1]
    });
    return await modal.present();
  }

  closeModal(){
    this.modalController.dismiss({
      'dismissed': true
    }
    );
  }
}
