import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-visualization-cart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './visualization-cart.component.html',
  styleUrl: './visualization-cart.component.css',
})
export class VisualizationCartComponent {
  multi: any[] | undefined = [
    {
      name: 'temperature',
      series: [
        {
          name: '2024-04-01',
          value: 19.4,
        },
        {
          name: '2024-04-02',
          value: 13.6,
        },
        {
          name: '2024-04-03',
          value: 11.5,
        },
        {
          name: '2024-04-04',
          value: 14.2,
        },
        {
          name: '2024-04-05',
          value: 18.8,
        },
        {
          name: '2024-04-06',
          value: 21.9,
        },
        {
          name: '2024-04-07',
          value: 22.2,
        },
        {
          name: '2024-04-08',
          value: 25.6,
        },
        {
          name: '2024-04-09',
          value: 25.5,
        },
        {
          name: '2024-04-10',
          value: 13.6,
        },
        {
          name: '2024-04-11',
          value: 15.8,
        },
        {
          name: '2024-04-12',
          value: 19.1,
        },
        {
          name: '2024-04-13',
          value: 21.0,
        },
        {
          name: '2024-04-14',
          value: 17.4,
        },
        {
          name: '2024-04-15',
          value: 13.3,
        },
      ],
    },
  ];
  view: [number, number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'time';
  yAxisLabel: string = 'temperature';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor() {
    Object.assign(this, { multi: this.multi });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
