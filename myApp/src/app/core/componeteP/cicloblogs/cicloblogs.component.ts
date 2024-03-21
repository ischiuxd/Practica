import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-cicloblogs',
  standalone: true,
  templateUrl: './cicloblogs.component.html',
  styleUrls: ['./cicloblogs.component.css']
})
export class CicloblogsComponent  {
  @Input() cursos: any[] = [];

  constructor() {}

  
}
