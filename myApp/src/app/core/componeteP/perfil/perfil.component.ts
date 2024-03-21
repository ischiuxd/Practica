
        import { Component, OnInit } from '@angular/core';
        import { CacheService } from '../../servicioC/cache.service';
        import { UsuariosService } from '../../servicios/usuarios.service';
        import { Usuariosinterfaz } from '../../../Interfaces/Usuarios.interface';
        import { BuscarCLService } from '../../servicioCL/buscar-cl.service';
        
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
              
            <section>
        @for (curso of cursos; track curso.id) {
          <article>
            {{curso.id}}
            {{curso.curso}}
            {{ curso.maestro }}
          </article>}
</section>
        
            </div>
          `,
          styleUrls: ['./perfil.component.css']
        })
        export class PerfilComponent implements OnInit {
          usuario: Usuariosinterfaz | undefined;
          cursos: any[] = [];
        
          constructor(
            private listaUSER: UsuariosService,
            private cacheService: CacheService,
            private buscarCLService: BuscarCLService
          ) {}
        
          ngOnInit(): void {
            const cacheItem = this.cacheService.getItem();
            if (cacheItem && cacheItem.length > 0) {
              const userId = cacheItem[0];
        
              this.listaUSER.getusuarios().subscribe(
                (data: Usuariosinterfaz[]) => {
                  this.usuario = data.find(user => user.id_us === userId);
                  if (this.usuario) {
                    this.obtenerInformacion(cacheItem[0]);
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
        }
        