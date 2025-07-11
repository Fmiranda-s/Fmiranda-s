import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosService, Pago } from '../../service/pagos.service';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css'
})
export class Pagos implements OnInit {
  pagos: Pago[] = [];

  constructor(private pagosService: PagosService) {}

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos(): void {
    this.pagosService.obtenerPagos().subscribe(data => {
      this.pagos = data;
    });
  }

  eliminarPago(id: number): void {
    if (confirm('¿Eliminar este pago?')) {
      this.pagosService.eliminarPago(id).subscribe(() => {
        this.cargarPagos();
      });
    }
  }
}
