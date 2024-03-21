import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ciclocurso',
  templateUrl: './ciclocurso.component.html',
  styleUrls: ['./ciclocurso.component.css']
})
export class CiclocursoComponent {
  @Input() cursos: any[] = [];

  constructor() { }
}
