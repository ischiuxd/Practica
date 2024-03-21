import { Component } from '@angular/core';
import { AgregarService } from '../../core/servicioA/agregar.service';
import { Usuariosinterfaz } from '../../Interfaces/Usuarios.interface';
import { UsuariosService } from '../../core/servicios/usuarios.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  USUARIOSXD: Usuariosinterfaz[] = [];

  constructor(private agregarService: AgregarService, private listaUSER: UsuariosService, private router: Router) {}

  agregarUsuario(registro: string, nombre: string, apellido: string, contra: string, correo: string) {

    if (!registro || !nombre || !apellido || !contra || !correo) {
      alert("Por favor, complete todos los campos.");
      return; 
    }

    this.getUSUARIOS().subscribe(() => {

      const nuevoUsuario: Usuariosinterfaz = {
        id_us: this.generarIDUnico(),
        registro_us: parseInt(registro),
        nombre_us: nombre,
        apellido_us: apellido,
        contra_us: contra,
        admin_us: 0,
        correo_us: correo
      };

      console.log(nuevoUsuario); 

      if (this.verficarExistencia(correo, registro)) {
        alert("Usuario o registro ya existen");
      } else {

  this.agregarService.agregarUsuario(nuevoUsuario).subscribe(() => {
   
    this.router.navigate(['/']);
  }, error => {
   
  });
}

    });
  }

  getUSUARIOS(): Observable<void> {
    return this.listaUSER.getusuarios().pipe(
      tap(result => {
        this.USUARIOSXD = result;
      }),
      catchError(err => {
        console.log(err);
        return EMPTY; 
      })
    );
  }

  verficarExistencia(correo: string, registro: string): boolean {
    const usuarioCorreoExistente = this.USUARIOSXD.find(usuario =>
      usuario.correo_us === correo
    );
    const usuarioRegistroExistente = this.USUARIOSXD.find(usuario =>
      usuario.registro_us === parseInt(registro)
    );
    return usuarioCorreoExistente !== undefined || usuarioRegistroExistente !== undefined;
  }



  generarIDUnico(): number {
    let nuevoID: number;
    do {
      nuevoID = Math.floor(Math.random() * 200) + 1;
    } while (this.IDExistente(nuevoID));
    return nuevoID;
  }

  IDExistente(id: number): boolean {
    return this.USUARIOSXD.some(usuario => usuario.id_us === id);
  }
}
