import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import '@ionic/pwa-elements';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';

@Component({
  selector: 'app-add-asistencia',
  templateUrl: './add-asistencia.page.html',
  styleUrls: ['./add-asistencia.page.scss'],
})
export class AddAsistenciaPage implements OnInit {
  asistencia = {
    fecha_asistencia : "",
    tipo_asistencia : "",
    coordenadas_asistencia : "",
    fk_usuario : "",
  };

  session = {
    key: ""
  }

  errores = {
    fecha_asistencia : "",
    tipo_asistencia : "",
    coordenadas_asistencia : "",
    fk_usuario : "",
  }

  icono = null;
  formato = null;
  contenedores = [];

  constructor(
    private restService: RestService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private loadingController : LoadingController
  ) { this.obtenerDatos() }

  async obtenerDatos() {
    this.session = await this.restService._session();
  }

  cerrar_sesion() {
    this.restService.cerrarSesion();
  }

  ngOnInit(){

  }

  async seleccionar_icono () {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64
    });
    console.log(image);
    this.icono = "data:image/" + image.format + ";base64," + image.base64String;
    this.formato = image.format
  }

  async addAsistencia() {
    if ( this.icono != null ) {
      let options : PositionOptions = {
        enableHighAccuracy : true
      }
      const coordinates = await Geolocation.getCurrentPosition();

      let leerBase64 = await fetch(this.icono);
      let binario = await leerBase64.blob();
      let nombre = new Date() + "." + this.formato;

      let formulario = new FormData();

      this.asistencia.coordenadas_asistencia = coordinates.coords.latitude + " " + coordinates.coords.longitude;

      formulario.append("tipo_asistencia", this.asistencia.tipo_asistencia);
      formulario.append("foto_asistencia", binario, nombre);
      formulario.append("coordenadas_asistencia", this.asistencia.coordenadas_asistencia);
      formulario.append("fk_usuario", this.session.key);

      this.restService.subida_ficheros_y_datos('asistencias/api/asistencias', formulario).subscribe(result => {
        console.log(result);

        let parametros : NavigationExtras = {
          state : {
            reload : true
          }
        }

        this.router.navigate(['home'],parametros);

      });
    } else {
      this.restService.mostrar_toast("Error", "danger", "No se ha seleccionado foto", "top", 4000);
    }

  }
}
