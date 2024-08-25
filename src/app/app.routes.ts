import { Routes } from '@angular/router';
import { ListLibrosAdminComponent } from './components/list-libros-admin/list-libros-admin.component';
import { LoginComponent } from './components/login/login.component';
import { ListLibroUserComponent } from './components/list-libro-user/list-libro-user.component';
import { AuthGuard } from './guards/auth.guard';
import { ListLibroUserPosComponent } from './components/list-libro-user-pos/list-libro-user-pos.component';
import { ListLibroUserHistComponent } from './components/list-libro-user-hist/list-libro-user-hist.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'listado-libros',
        component: ListLibrosAdminComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'administrador' } 
    },
    {
        path: 'listado-libros-user',
        component: ListLibroUserComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'usuario regular' } 
    },
    {
        path: 'listado-libros-user-pos',
        component: ListLibroUserPosComponent, 
        canActivate: [AuthGuard],
        data: { expectedRole: 'usuario regular' }  
    },
    {
        path: 'listado-libros-user-hist',
        component: ListLibroUserHistComponent, 
        canActivate: [AuthGuard],
        data: { expectedRole: 'usuario regular' }  
    }

];
