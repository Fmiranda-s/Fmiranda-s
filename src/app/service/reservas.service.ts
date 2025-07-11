import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Interfaz para usar en el componente
export interface Reserva {
  id?: number;
  id_usuario: number;
  id_habitacion: number;
  fecha_inicio: string;
  fecha_fin: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private apiUrl = 'https://apiclases.inacode.cl/hotel/reservas';

  constructor(private http: HttpClient) { }

  // ✅ GET: Lista todas las reservas
  obtenerReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  // ✅ POST: Crea una nueva reserva
  crearReserva(reserva: Reserva): Observable<any> {
    return this.http.post(this.apiUrl, reserva);
  }

  // ✅ PUT: Edita una reserva
  actualizarReserva(id: number, reserva: Reserva): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reserva);
  }

  // ✅ DELETE: Elimina una reserva
  eliminarReserva(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
