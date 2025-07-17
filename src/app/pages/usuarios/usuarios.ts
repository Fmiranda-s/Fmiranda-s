import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService, Usuario } from '../../service/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  eliminarUsuario(id: number | undefined): void {
    if (id === undefined) {
      alert('❌ ID de usuario no válido');
      console.error('ID es undefined');
      return;
    }

    console.log('🗑️ Intentando eliminar usuario con ID:', id);

    if (confirm('¿Eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(id).subscribe({
        next: () => {
          alert('✅ Usuario eliminado correctamente');
          this.usuarios = this.usuarios.filter(u => u.id !== id);
        },
        error: err => {
          alert('❌ Error al eliminar el usuario');
          console.error('Error al eliminar usuario:', err);
        }
      });
    }
  }
}
