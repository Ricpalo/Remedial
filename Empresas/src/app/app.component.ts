import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from './services/rest.service';
import { Platform} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private servicio : RestService,
    private navController : NavController,
  ) {
    this.platform.ready().then(() => {
      this.servicio.estatus_sesion.subscribe(state => {
        if(state){
          this.navController.navigateRoot(['home']);
        }else{
          this.navController.navigateRoot(['']);
        }
      });
    });
  }
}
