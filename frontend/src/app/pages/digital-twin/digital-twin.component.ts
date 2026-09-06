import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal
} from '@angular/core';

import { PatientService } from '../../services/patient.service';

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-digital-twin',
  standalone: true,
  imports: [],
  templateUrl: './digital-twin.component.html',
  styleUrl: './digital-twin.component.css'
})
export class DigitalTwinComponent {

  private patientService = inject(PatientService);

  protected readonly digitalTwin =
    signal<any | null>(null);

  protected readonly loading =
    signal(true);

  @ViewChild('healthChart')
  private healthChart?: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  constructor() {
    this.loadDigitalTwin();
  }

  private loadDigitalTwin(): void {

    this.patientService
      .getDigitalTwin('P001')
      .subscribe({

        next: (twin) => {

          this.digitalTwin.set(twin);
          this.loading.set(false);

          setTimeout(() => {
            this.createHealthChart();
          }, 150);

        },

        error: (error) => {

          console.error(
            'Failed to load Digital Twin:',
            error
          );

          this.loading.set(false);
        }

      });
  }

  private createHealthChart(): void {

    const canvas = this.healthChart?.nativeElement;

    const twin = this.digitalTwin();

    if (!canvas || !twin?.vitals?.length) {
      return;
    }

    const vitals = twin.vitals;

    const labels = vitals.map(
      (_: any, index: number) =>
        `Reading ${index + 1}`
    );

    const heartRate = vitals.map(
      (vital: any) =>
        Number(vital.heartRate)
    );

    const spo2 = vitals.map(
      (vital: any) =>
        Number(vital.spo2)
    );

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(canvas, {

      type: 'line',

      data: {

        labels,

        datasets: [

          {
            label: 'Heart Rate',
            data: heartRate,

            yAxisID: 'heartRate',

            borderColor: '#d9a441',
            backgroundColor: 'rgba(217, 164, 65, 0.08)',

            borderWidth: 2,

            pointRadius: 4,
            pointHoverRadius: 6,

            pointBackgroundColor: '#d9a441',
            pointBorderColor: '#11151c',

            tension: 0.35,

            fill: false
          },

          {
            label: 'SpO₂',
            data: spo2,

            yAxisID: 'spo2',

            borderColor: '#55bd78',
            backgroundColor: 'rgba(85, 189, 120, 0.08)',

            borderWidth: 2,

            pointRadius: 4,
            pointHoverRadius: 6,

            pointBackgroundColor: '#55bd78',
            pointBorderColor: '#11151c',

            tension: 0.35,

            fill: false
          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {
          mode: 'index',
          intersect: false
        },

        plugins: {

          legend: {

            position: 'top',

            labels: {
              color: '#aeb7c5',

              usePointStyle: true,

              pointStyle: 'circle',

              padding: 18,

              font: {
                size: 11
              }
            }

          },

          tooltip: {

            backgroundColor: '#171b22',

            borderColor: '#343a45',

            borderWidth: 1,

            titleColor: '#ffffff',

            bodyColor: '#c5ccd7',

            padding: 10,

            displayColors: true
          }

        },

        scales: {

          x: {

            ticks: {
              color: '#737d8c',

              font: {
                size: 10
              }
            },

            grid: {
              color: 'rgba(255,255,255,0.04)'
            },

            border: {
              color: '#303640'
            }

          },

          heartRate: {

            type: 'linear',

            position: 'left',

            beginAtZero: false,

            suggestedMin: 60,

            suggestedMax: 100,

            ticks: {

              color: '#8e98a8',

              font: {
                size: 10
              }
            },

            title: {

              display: true,

              text: 'Heart Rate (bpm)',

              color: '#8e98a8',

              font: {
                size: 10
              }
            },

            grid: {

              color: 'rgba(255,255,255,0.05)'
            },

            border: {
              color: '#303640'
            }

          },

          spo2: {

            type: 'linear',

            position: 'right',

            min: 90,

            max: 100,

            ticks: {

              color: '#8e98a8',

              font: {
                size: 10
              }
            },

            title: {

              display: true,

              text: 'SpO₂ (%)',

              color: '#8e98a8',

              font: {
                size: 10
              }
            },

            grid: {
              drawOnChartArea: false
            },

            border: {
              color: '#303640'
            }

          }

        }

      }

    });
  }
}