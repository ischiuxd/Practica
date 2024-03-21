import { Component } from '@angular/core';
import { UsuariosService } from '../../core/servicios/usuarios.service';
import { Usuariosinterfaz } from '../../Interfaces/Usuarios.interface';
import { Router } from '@angular/router';
import { CacheService } from '../../core/servicioC/cache.service';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  USUARIOSXD: Usuariosinterfaz[] = [];
  iduser: number= 5000;
  adminuser:boolean=false;
  constructor(private listaUSER: UsuariosService, private router: Router,private cacheService: CacheService) {}

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
      this.cacheService.setItem(this.iduser, this.adminuser);
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


      this.iduser=usuarioEncontrado.id_us;
      if (usuarioEncontrado.admin_us===0) {
        this.adminuser=false;
      } else {
        this.adminuser=true;
      }

      
      return false;
    } else {
      return true;
    }
  }
}
