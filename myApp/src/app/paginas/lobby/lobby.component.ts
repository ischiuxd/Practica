import { Component } from '@angular/core';
import { UsuariosService } from '../../core/servicios/usuarios.service';
import { Usuariosinterfaz } from '../../Interfaces/Usuarios.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  USUARIOSXD: Usuariosinterfaz[] = [];

  constructor(private listaUSER: UsuariosService, private router: Router) {}

  getUSUARIOS(): void {
    this.listaUSER.getusuarios().subscribe({
      next: (result) => {
        this.USUARIOSXD = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ingresar(): void {
    this.getUSUARIOS();
    if (this.verficar()) {
     
    } else {
      this.router.navigate(['/sala']);
    }
  }

  verficar(): boolean {
    var email = (document.getElementById('email') as HTMLInputElement).value;
    var password = (document.getElementById('password') as HTMLInputElement).value;
    const usuarioEncontrado = this.USUARIOSXD.find(usuario =>
      (usuario.registro_us === parseInt(email)  || usuario.correo_us === email ) && usuario.contra_us === password
    );
    if (usuarioEncontrado) {
      return false;
    } else {
      return true;
    }
  }
}
