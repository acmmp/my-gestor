import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegistroGastosComponent } from './registro-gastos/registro-gastos.component';
import { GraficosComponent } from './graficos/graficos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RegistroGastosComponent, GraficosComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-gestor';
}
