import { Component, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CacheService } from '../../servicioC/cache.service';
import { BuscarCrsService } from '../../servicioCRS/buscar-crs.service';
import { CicloblogsComponent } from '../cicloblogs/cicloblogs.component';
import { BuscarBLGService } from '../../serviciobg/buscar-blg.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuariosinterfaz } from '../../../Interfaces/Usuarios.interface';
import { AddbgService } from '../../servicioAB/addbg.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements AfterViewInit {
  cursos: any[] = [];

  @ViewChild('componenteDinamico', { read: ViewContainerRef }) componenteDinamico!: ViewContainerRef;

  constructor(
    private cacheService: CacheService,
    private buscarCrsService: BuscarCrsService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private buscarbgService: BuscarBLGService,
    private listaUSER: UsuariosService,
    private servivioA: AddbgService
  ) { }

  ngAfterViewInit() {
    this.obtenerCursos();
    this.agregarCicloblogsComponent();
  }

  obtenerFechaHoy() {
    const fechaHoy = new Date();
    const dia = this.agregarCeros(fechaHoy.getDate(), 2);
    const mes = this.agregarCeros(fechaHoy.getMonth() + 1, 2);
    const año = fechaHoy.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${año}`;

    return fechaFormateada;
  }

  obtenerCursos() {
    this.buscarCrsService.getcursos().subscribe(
      (data: any[]) => {
        this.cursos = data;
      },
      error => {
        console.error('Error al obtener cursos:', error);
      }
    );
  }

  mandarPost(clase: string, a: string) {
    if (a.trim() === "") {
      alert("Por favor complete todos los campos.");
    } else {
      const idPersona = this.cacheService.getItem()?.[0];
      if (idPersona) {
        this.listaUSER.getusuarios().subscribe(
          (usuarios: Usuariosinterfaz[]) => {
            const usuarioEncontrado = usuarios.find(usuario => usuario.id_us === idPersona);
            if (usuarioEncontrado) {
              this.buscarbgService.getposteso().subscribe(
                (posts: any[]) => {
                  const nuevoID = posts.length + 1;
                  const nuevoPost = {
                    id_bg: nuevoID.toString(),
                    usuario_bg: usuarioEncontrado.registro_us,
                    curso_bg: clase,
                    mensa_bg: a,
                    fecha_bg: this.obtenerFechaHoy()
                  };

                  this.servivioA.agregarUsuario(nuevoPost).subscribe(
                    (response: any) => {
                      alert("El post se ha agregado correctamente.");
                      this.agregarCicloblogsComponent();
                    },
                    error => {
                      console.error('Error al agregar el post:', error);
                      alert("Error al agregar el post. Por favor, intenta de nuevo.");
                    }
                  );
                },
                error => {
                  console.error('Error al obtener posts:', error);
                  alert("Error al obtener posts. Por favor, intenta de nuevo.");
                }
              );
            } else {

            }
          },
          error => {
            console.error('Error al obtener usuarios:', error);
            alert("Error al obtener usuarios. Por favor, intenta de nuevo.");
          }
        );
      } else {

      }
    }
  }

  private agregarCeros(valor: number, longitud: number): string {
    return valor.toString().padStart(longitud, '0');
  }

  agregarCicloblogsComponent() {
    this.componenteDinamico.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CicloblogsComponent);
    const componentRef = this.componenteDinamico.createComponent(componentFactory);
    this.buscarbgService.getposteso().subscribe(
      (data: any) => {
        componentRef.instance.cursos = data;
      },
      error => {

      }
    );
  }



}
