import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../service/usuarios.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './auth-login.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required]
    });
  }

  login() {
    const { correo, contraseña } = this.loginForm.value;

    this.usuariosService.login(correo, contraseña).subscribe(usuario => {
      if (usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.router.navigate(['/habitaciones']);
      } else {
        this.error = 'Correo o contraseña incorrectos';
      }
    });
  }
}
