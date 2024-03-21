
        import { Component, AfterViewInit } from '@angular/core';
        import { CacheService } from '../../servicioC/cache.service';
        import { UsuariosService } from '../../servicios/usuarios.service';
        import { Usuariosinterfaz } from '../../../Interfaces/Usuarios.interface';
        import { BuscarCLService } from '../../servicioCL/buscar-cl.service';
import { BuscarCrsService } from '../../servicioCRS/buscar-crs.service';
        
        @Component({
          selector: 'app-perfil',
          template: `
            <div class="usuares">
              <section>
                <article>
                  <label>Registro:</label>
                  <span>{{ usuario?.registro_us }}</span>
                </article>
                <article>
                  <label>Nombre:</label>
                  <span>{{ usuario?.nombre_us }}</span>
                </article>
                <article>
                  <label>Apellido:</label>
                  <span>{{ usuario?.apellido_us }}</span>
                </article>
                <article>
                  <label>Correo:</label>
                  <span>{{ usuario?.correo_us }}</span>
                </article>
              </section>
            </div>
        
            <div class="cursares">
<div class="seleccion">
            <select ngModel required #clase>
          @for (curso of curchos; track curso.id) {
            <option value="{{ curso.id_cs }}/{{ curso.curso_cs }}/{{ curso.maestro_cs }}" >
              
            {{ curso.maestro_cs }} - {{ curso.curso_cs }}</option>
          }
        </select>
<button (click)="ADDcurse(clase.value)"> agregar curso</button>
</div>
            <section>
        @for (curso2 of cursos; track curso2.id) {
          <article>
            {{curso2.id}}
            {{curso2.curso}}
            {{ curso2.maestro }}
          </article>}
</section>
        
            </div>
          `,
          styleUrls: ['./perfil.component.css']
        })
        export class PerfilComponent implements AfterViewInit {
          usuario: Usuariosinterfaz | undefined;
          cursos: any[] = [];
          curchos: any[] = [];
          constructor(
            private listaUSER: UsuariosService,
            private cacheService: CacheService,
            private buscarCLService: BuscarCLService,
            private buscarCrsService: BuscarCrsService
          ) {}
        
          ngAfterViewInit(): void {

        
            const cacheItem = this.cacheService.getItem();
            if (cacheItem && cacheItem.length > 0) {
              const userId = cacheItem[0];
        
              this.listaUSER.getusuarios().subscribe(
                (data: Usuariosinterfaz[]) => {
                  this.usuario = data.find(user => user.id_us === userId);
                  if (this.usuario) {
                    this.obtenerInformacion(cacheItem[0]);
                    this.buscarCrsService.getcursos().subscribe(
                      (data) => {
                        this.curchos = data;
                      },
                      (error) => {
                 
                      }
                    );
                  } else {
                  }
                },
                error => {
       
                }
              );

        
            } else {
            
            }
          }
    
          obtenerInformacion(id: number) {
            this.buscarCLService.obtenerInfoPersona(id).subscribe(
              (data) => {
            
                const info = JSON.parse(data.info);
                this.cursos = info.cursos || [];
              },
              (error) => {
             
              }
            );
          }


          ADDcurse(clase: string) {
            const partesClase = clase.split('/');
            const idCurso = partesClase[0];

            const nombreCurso = partesClase[1];
            const nombreMaestro = partesClase[2];

            const cursoExistente = this.cursos.find(curso => curso.id === idCurso);
          
            if (cursoExistente) {
              alert(`El curso de ${nombreCurso} con ${nombreMaestro} ya existe.`);
            } else {
        

              this.cursos.push({
                id: idCurso,
                curso: nombreCurso,
                maestro: nombreMaestro
              });
           

console.log("agregador");



            }
          }
          
          
          
          


          
        }
        