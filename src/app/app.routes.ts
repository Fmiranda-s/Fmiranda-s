import { Routes } from '@angular/router';
import { Habitaciones } from './pages/habitaciones/habitaciones';
import { Reservas } from './pages/reservas/reservas';
import { Pagos } from './pages/pagos/pagos';
import { Usuarios } from './pages/usuarios/usuarios';
import { AuthLogin } from './pages/auth-login/auth-login';

export const routes: Routes = [
    {path:'habitaciones', component: Habitaciones},
    {path:'reservas', component:Reservas},
    {path:'pagos', component:Pagos},
    {path:'usuarios', component:Usuarios},
    {path:'login',component:AuthLogin}

];
