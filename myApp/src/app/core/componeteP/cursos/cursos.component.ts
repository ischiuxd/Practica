import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BuscarCrsService } from '../../servicioCRS/buscar-crs.service';
import { CiclocursoComponent } from '../../componeteP/ciclocurso/ciclocurso.component'; // Importar el componente CiclocursoComponent

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  @ViewChild('componenteDinamico', { read: ViewContainerRef }) componenteDinamicoRef!: ViewContainerRef;

  cursos: any[] = [];
  resultadosFiltrados: any[] = [];
  maestro: string = '';
  clase: string = '';

  constructor(
    private buscarCrsService: BuscarCrsService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.obtenerCursos();
  }

  obtenerCursos(): void {
    this.buscarCrsService.getcursos().subscribe(
      (data: any) => {
        this.cursos = data;
        this.arrayaesxpo(this.cursos);
      },
      error => {
       
      }
    );
  }

  arrayaesxpo(cursos: any[]): void {
    this.componenteDinamicoRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CiclocursoComponent);
    const componentRef = this.componenteDinamicoRef.createComponent(componentFactory);
    componentRef.instance.cursos = cursos;
  }
  filtrarPorMaestro(as: string): void {
 
    if (this.cursos) {
  
      this.resultadosFiltrados = [];
      for (let i = 0; i < this.cursos.length; i++) {
        const curso = this.cursos[i];
     
        if (curso.maestro_cs === as) {
          this.resultadosFiltrados.push(curso);
       
        }
      }
     
      this.arrayaesxpo(this.resultadosFiltrados);
    } else {
    
    }
  }
  
  filtrarPorcurso(as: string): void {
    
    if (this.cursos && as !== '') {
     
      this.resultadosFiltrados = [];
      for (let i = 0; i < this.cursos.length; i++) {
        const curso = this.cursos[i];
   
        if (curso.curso_cs === as) {
          this.resultadosFiltrados.push(curso);
        
        }
      }

      this.arrayaesxpo(this.resultadosFiltrados);
    } else {

    }
  }
  
  
  
  
  

}
