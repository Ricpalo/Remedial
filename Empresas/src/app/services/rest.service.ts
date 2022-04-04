import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  url_mi_api = "http://localhost/sw17_ws/";
  private httpClientFiles: HttpClient;
  public estatus_sesion =  new BehaviorSubject(false);

  constructor(
    private platform : Platform,
    private http: HttpClient,
    private toastController: ToastController,
    private loadingController : LoadingController,
    private handler : HttpBackend,
    private storage : Storage
    ) {
      this.platform.ready().then(()=>{
        this.iniciarStorage();
        this.httpClientFiles = new HttpClient(this.handler);
        this.estaLogeado();
      });
  }

  async iniciarStorage(){
    await this.storage.create();
  }

  ejecutar_post(_url : string,_datos : any){
    return this.http.post<any>(this.url_mi_api+_url,_datos);
  }
  ejecutar_put(_url : string, _datos : any){
    return this.http.put<any>(this.url_mi_api+_url,_datos);
  }
  ejecutar_get( _url : string,_params : any){
    return this.http.get<any>(this.url_mi_api+_url,{params: _params});
  }
  ejecutar_delete( _url : string,_params : any){
    return this.http.delete<any>(this.url_mi_api+_url,{params: _params});
  }
  subida_ficheros_y_datos(_url : string, _datos : any): Observable<any>{
    let encabezados = {
      headers: new HttpHeaders({'sw17-API-KEY' : 'sw17-key'})
    };
    return this.httpClientFiles.post<any>(this.url_mi_api+_url,_datos,encabezados);
  }

  //mensajes con toast
  async mostrar_toast(_titulo,_color,_mensaje,_posicion,_duracion){
    const toast = await this.toastController.create({
      header: _titulo,
      message: _mensaje,
      position: _posicion,
      color : _color,
      duration:  _duracion,
      buttons: [
        {
          icon: 'close-circle',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }
  //validaciones de sesiones
  iniciarSesion(_session){
    this.storage.set('SESS_ALMACEN_SW17',_session);
    this.estatus_sesion.next(true);
  }
  cerrarSesion(){
    this.storage.remove('SESS_ALMACEN_SW17');
    this.estatus_sesion.next(false);
  }
  estaLogeado(){
    this.storage.get('SESS_ALMACEN_SW17').then((res) => {
      if(res){
        this.estatus_sesion.next(true);
      }
    });
  }
  validarSesion(){
    return this.estatus_sesion.value;
  }
  _session(){
    return this.storage.get('SESS_ALMACEN_SW17');
  }
}
