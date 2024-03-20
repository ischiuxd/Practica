import { Routes } from '@angular/router';
import { ContraComponent } from"./paginas/contra/contra.component";
import { LobbyComponent } from"./paginas/lobby/lobby.component";
import { SalaComponent } from './paginas/sala/sala.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { AdminComponent } from './paginas/admin/admin.component';

export const routes: Routes = [

    {path:"",component:LobbyComponent},
    {path:"contra",component:ContraComponent},
    {path:"sala",component:SalaComponent},
    {path:"registro",component:RegistroComponent},
    {path:"admin",component:AdminComponent}

];
