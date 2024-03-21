import { Component, AfterViewInit , ComponentFactoryResolver, ViewChild, ViewContainerRef, Type } from '@angular/core';
import { CacheService } from '../../core/servicioC/cache.service';
import { PerfilComponent } from '../../core/componeteP/perfil/perfil.component';
import { CursosComponent } from '../../core/componeteP/cursos/cursos.component';
import { BlogComponent } from '../../core/componeteP/blog/blog.component';
import { OtrosUSUComponent } from '../../core/componeteP/otros-usu/otros-usu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements AfterViewInit  {
  @ViewChild('componenteDinamico', { read: ViewContainerRef }) componenteDinamicoRef!: ViewContainerRef;
  componenteActivo: string = '';
  valorcache:  [number, boolean] | null = null;

  constructor(
    private cacheService: CacheService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router
  ) {}

  ngAfterViewInit (): void {
    this.verificarCache();
    this.logBlog();
    this.valorcache= this.cacheService.getItem();
  }

  logPerfil(){
    this.agregarcomponente(PerfilComponent);
  }

  logCursos(){
    this.agregarcomponente(CursosComponent);
  }

  logBlog(){
    this.agregarcomponente(BlogComponent);
  }

  logOtros(){
    this.agregarcomponente(OtrosUSUComponent);
  }
  salir(){

    this.router.navigate(['/']);
  }

  agregarcomponente(CPDDT: Type<unknown>) {
    this.componenteDinamicoRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CPDDT);
    this.componenteDinamicoRef.createComponent(componentFactory);
  }

  mostrarComponente(componente: string): void {
    this.componenteActivo = componente;
  }

  verificarCache(): void {
    const cacheData = this.cacheService.getItem();
    if (cacheData) {

     
    } else {
    this.router.navigate(['/']);
    }
  }
}
