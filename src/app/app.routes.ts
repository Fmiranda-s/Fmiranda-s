import { Routes } from '@angular/router';
import { Habitaciones } from './pages/habitaciones/habitaciones';
import { Reservas } from './pages/reservas/reservas';
import { Pagos } from './pages/pagos/pagos';
import { Usuarios } from './pages/usuarios/usuarios';
import { LoginComponent } from './pages/auth-login/auth-login';
import { RegisterComponent } from './pages/auth-registre/auth-registre';  // <-- Importa el componente registro

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'habitaciones', component: Habitaciones },
    { path: 'reservas', component: Reservas },
    { path: 'pagos', component: Pagos },
    { path: 'usuarios', component: Usuarios },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },  
];
