import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as echarts from 'echarts';
import { GastosService } from '../gastos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css'],
  standalone: true
})
export class GraficosComponent implements AfterViewInit, OnDestroy {

  private gastoSubscription: Subscription;
  private chart?: echarts.ECharts;
  
  constructor(
    private gastosService: GastosService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Suscripción para actualizar el gráfico cuando se añade un gasto
    this.gastoSubscription = this.gastosService.gastoAdded.subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.updateChart();
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createChart();
    }
  }

  ngOnDestroy() {
    // Desuscripción para evitar fugas de memoria
    this.gastoSubscription.unsubscribe();
    if (this.chart) {
      this.chart.dispose();
    }
  }

  private createChart() {
    if (isPlatformBrowser(this.platformId)) {
      const chartDom = document.getElementById('myChart')!;
      this.chart = echarts.init(chartDom);
      this.updateChart(this.chart);
    }
  }

  private updateChart(myChart?: echarts.ECharts) {
    if (isPlatformBrowser(this.platformId)) {
      const chartDom = document.getElementById('myChart')!;
      if (!myChart) {
        myChart = echarts.init(chartDom);
      }

      const data = this.gastosService.getGastos();

      const option = {
        xAxis: {
          type: 'category',
          data: data.map(d => d.categoria)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data.map(d => d.monto),
          type: 'bar'
        }]
      };

      myChart.setOption(option);
    }
  }
}
