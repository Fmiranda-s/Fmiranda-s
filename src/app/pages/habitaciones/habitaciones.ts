import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitacionesService, Habitacion } from '../../service/habitaciones.service';
import { ReservasService } from '../../service/reservas.service';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './habitaciones.html',
  styleUrls: ['./habitaciones.css']
})
export class Habitaciones implements OnInit {
  habitaciones: Habitacion[] = [];

  habitacionSeleccionada: Habitacion | null = null;
  fechaDesde: string = '';
  fechaHasta: string = '';

  constructor(
    private habitacionesService: HabitacionesService,
    private reservaService: ReservasService
  ) {}

  ngOnInit(): void {
    this.cargarHabitaciones();
  }

  cargarHabitaciones(): void {
    this.habitacionesService.obtenerHabitaciones().subscribe({
      next: data => {
        console.log('Habitaciones desde API:', data);
        this.habitaciones = data;
      },
      error: err => {
        console.error('Error al cargar habitaciones:', err);
        alert('No se pudieron cargar las habitaciones. La API puede estar caída.');
      }
    });
  }

  mostrarFormularioReserva(habitacion: Habitacion): void {
    this.habitacionSeleccionada = habitacion;
    const hoy = new Date().toISOString().split('T')[0];
    this.fechaDesde = hoy;
    this.fechaHasta = hoy;
  }

  cancelarReserva(): void {
    this.habitacionSeleccionada = null;
    this.fechaDesde = '';
    this.fechaHasta = '';
  }

  confirmarReserva(): void {
    if (!this.fechaDesde || !this.fechaHasta) {
      alert('Por favor selecciona ambas fechas');
      return;
    }
    if (this.fechaDesde > this.fechaHasta) {
      alert('La fecha de inicio no puede ser mayor que la fecha fin');
      return;
    }
    if (this.habitacionSeleccionada) {
      const reserva = {
        id_usuario: 1, // Ajustar según login
        id_habitacion: this.habitacionSeleccionada.id!,
        fecha_inicio: this.fechaDesde,
        fecha_fin: this.fechaHasta
      };
      this.reservaService.crearReserva(reserva).subscribe({
        next: () => {
          alert('✅ Reserva creada con éxito');
          this.cancelarReserva();
        },
        error: (err) => {
          alert('❌ Error al crear la reserva');
          console.error(err);
        }
      });
    }
  }
}
