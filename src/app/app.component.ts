import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'interceptores';

  constructor(private usuarioService: UsuariosService) {
    this.usuarioService.obtenerUsuarios()
      .subscribe((res) => {
        console.log('%cla respuesta', 'background-color: aqua;', res);
      }, (err) => {
        console.log('%cerror capturado', 'background-color: pink;', err);
      });
  }
}
