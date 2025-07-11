import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservasService, Reserva } from '../../service/reservas.service';
import { PagosService } from '../../service/pagos.service';
import { HabitacionesService, Habitacion } from '../../service/habitaciones.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css'
})
export class Reservas implements OnInit {
  reservas: Reserva[] = [];

  editando: boolean = false;
  reservaEditando: Reserva = {
    id: 0,
    id_usuario: 0,
    id_habitacion: 0,
    fecha_inicio: '',
    fecha_fin: ''
  };

  constructor(
    private reservasService: ReservasService,
    private pagosService: PagosService,
    private habitacionesService: HabitacionesService
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservasService.obtenerReservas().subscribe((data: Reserva[]) => {
      this.reservas = data;
    });
  }

  eliminarReserva(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta reserva?')) {
      this.reservasService.eliminarReserva(id).subscribe(() => {
        this.cargarReservas();
      });
    }
  }

  editarReserva(reserva: Reserva): void {
    this.reservaEditando = { ...reserva };
    this.editando = true;
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.reservaEditando = {
      id: 0,
      id_usuario: 0,
      id_habitacion: 0,
      fecha_inicio: '',
      fecha_fin: ''
    };
  }

  guardarEdicion(): void {
    this.reservasService
      .actualizarReserva(this.reservaEditando.id!, this.reservaEditando)
      .subscribe({
        next: () => {
          alert('✅ Reserva actualizada');
          this.cancelarEdicion();
          this.cargarReservas();
        },
        error: err => {
          alert('❌ Error al actualizar la reserva');
          console.error(err);
        }
      });
  }

  registrarPago(reserva: Reserva): void {
    this.habitacionesService.obtenerHabitaciones().subscribe({
      next: (habitaciones: Habitacion[]) => {
        const habitacion = habitaciones.find(h => h.id === reserva.id_habitacion);
        if (!habitacion) {
          alert('❌ No se encontró la habitación para esta reserva');
          return;
        }

        const fechaInicio = new Date(reserva.fecha_inicio);
        const fechaFin = new Date(reserva.fecha_fin);
        const diffTime = fechaFin.getTime() - fechaInicio.getTime();
        const dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) ;

        const montoTotal = dias * habitacion.precio;

        const confirmar = confirm(
          `💳 Estás registrando un pago para la reserva ID ${reserva.id}.\n` +
          `🗓️ Días: ${dias}\n` +
          `💰 Precio por noche: $${habitacion.precio}\n` +
          `🔢 Total a pagar: $${montoTotal}\n\n¿Confirmar pago?`
        );

        if (!confirmar) return;

        const pago = {
          id_reserva: reserva.id!,
          monto: montoTotal,
          fecha_pago: new Date().toISOString().split('T')[0]
        };

        this.pagosService.registrarPago(pago).subscribe({
          next: () => {
            alert(`✅ Pago registrado correctamente`);
          },
          error: (err: any) => {
            alert('❌ Error al registrar el pago');
            console.error(err);
          }
        });
      },
      error: (err: any) => {
        alert('❌ Error al obtener las habitaciones');
        console.error(err);
      }
    });
  }
}
