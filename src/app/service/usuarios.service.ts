import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  contraseña: string;  // Mantengo contraseña con ñ
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'https://apiclases.inacode.cl/hotel/usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  login(correo: string, contraseña: string): Observable<Usuario | null> {
    const url = `${this.apiUrl}?correo=${encodeURIComponent(correo)}&contraseña=${encodeURIComponent(contraseña)}`;
    return this.http.get<Usuario[]>(url).pipe(
      map(usuarios => usuarios.length > 0 ? usuarios[0] : null)
    );
  }
}
