import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Habitacion {
  id?: number; // opcional para el POST
  numero: string;
  tipo: string;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  private apiUrl = 'https://apiclases.inacode.cl/hotel/habitaciones';

  constructor(private http: HttpClient) {}

  obtenerHabitaciones(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.apiUrl);
  }

  crearHabitacion(habitacion: Habitacion): Observable<any> {
    return this.http.post(this.apiUrl, habitacion);
  }

  actualizarHabitacion(id: number, habitacion: Habitacion): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, habitacion);
  }

  eliminarHabitacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
