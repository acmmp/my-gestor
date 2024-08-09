import { Component } from '@angular/core';
import { GastosService } from '../gastos.service';
import { FormsModule } from '@angular/forms'; // Aquí importas FormsModule

@Component({
  selector: 'app-registro-gastos',
  templateUrl: './registro-gastos.component.html',
  styleUrls: ['./registro-gastos.component.css'],
  standalone: true, // Uso de standalone components
  imports: [FormsModule] // Incluyes FormsModule en el arreglo de imports
})
export class RegistroGastosComponent {
  categoria: string = '';
  monto: number = 0;
  fecha: string = '';

  constructor(private gastosService: GastosService) {}

  registrarGasto() {
    this.gastosService.addGasto(this.categoria, this.monto, this.fecha);
    this.categoria = '';
    this.monto = 0;
    this.fecha = '';
  }
}
