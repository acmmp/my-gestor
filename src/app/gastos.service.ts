import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private gastos: { categoria: string, monto: number, fecha: string }[] = [];
  private gastoSubject = new BehaviorSubject<void>(undefined!);
  gastoAdded = this.gastoSubject.asObservable();

  addGasto(categoria: string, monto: number, fecha: string) {
    this.gastos.push({ categoria, monto, fecha });
    this.saveGastos();
    this.gastoSubject.next(); // Notificar a los suscriptores
  }

  getGastos() {
    return this.gastos;
  }

  private saveGastos() {
    localStorage.setItem('gastos', JSON.stringify(this.gastos));
  }

  private loadGastos() {
    const data = localStorage.getItem('gastos');
    if (data) {
      this.gastos = JSON.parse(data);
    }
  }
}
