import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService, Usuario } from '../../service/usuarios.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl:'./auth-registre.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string = '';
  success: string = '';

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  registrar() {
    if (this.registerForm.invalid) {
      this.error = 'Por favor completa todos los campos correctamente';
      return;
    }

    const nuevoUsuario: Usuario = this.registerForm.value;

    this.usuariosService.crearUsuario(nuevoUsuario).subscribe({
      next: () => {
        this.success = 'Usuario creado con éxito. Redirigiendo al login...';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = 'Error al crear usuario. Intenta nuevamente.';
        this.success = '';
        console.error(err);
      }
    });
  }
}
