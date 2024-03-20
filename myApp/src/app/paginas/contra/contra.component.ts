import { Component } from '@angular/core';
import { UsuariosService } from '../../core/servicios/usuarios.service';
import { Usuariosinterfaz } from '../../Interfaces/Usuarios.interface';
@Component({
  selector: 'app-contra',
  standalone: true,
  imports: [],
  templateUrl: './contra.component.html',
  styleUrl: './contra.component.css'
})
export class ContraComponent {
  contras:string="";
  USUARIOSXD: Usuariosinterfaz[] = [];

  constructor(private listaUSER: UsuariosService) {}

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
    const recuperarDiv =(document.getElementById('Recuperar') as HTMLInputElement).style;
    const contraDiv = (document.getElementById('contra') as HTMLInputElement).style;
    if (this.verficar()) {
      recuperarDiv.display = 'none';
      contraDiv.display = 'block';
    } else {
    }
  }

  verficar(): boolean {
    this.getUSUARIOS();
    var email = (document.getElementById('Registro') as HTMLInputElement).value;
    var password = (document.getElementById('Correo') as HTMLInputElement).value;
    const usuarioEncontrado = this.USUARIOSXD.find(usuario =>
      usuario.registro_us === parseInt(email) && usuario.correo_us === password
    );

    if (usuarioEncontrado) {
      this.contras=usuarioEncontrado.contra_us;
      return true;
    } else {
      return false;
    }
  }
}
