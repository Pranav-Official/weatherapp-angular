import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HistoricalDataService } from '../../services/historical-data.service';
import { catchError, map } from 'rxjs';
@Component({
  selector: 'app-visualization-cart',
  standalone: true,
  imports: [NgxChartsModule],
  providers: [HistoricalDataService],
  templateUrl: './visualization-cart.component.html',
  styleUrl: './visualization-cart.component.css',
})
export class VisualizationCartComponent {
  @Input() latitude?: string;
  @Input() longitude?: string;
  @Input() start_date?: string;
  @Input() end_date?: string;
  @Input() selector: string = '';

  errorMessage: string = '';
  // multi: any[] | undefined = [
  //   {
  //     name: 'temperature',
  //     series: [
  //       {
  //         name: '2024-04-01',
  //         value: 19.4,
  //       },
  //       {
  //         name: '2024-04-02',
  //         value: 13.6,
  //       },
  //       {
  //         name: '2024-04-03',
  //         value: 11.5,
  //       },
  //       {
  //         name: '2024-04-04',
  //         value: 14.2,
  //       },
  //       {
  //         name: '2024-04-05',
  //         value: 18.8,
  //       },
  //       {
  //         name: '2024-04-06',
  //         value: 21.9,
  //       },
  //       {
  //         name: '2024-04-07',
  //         value: 22.2,
  //       },
  //       {
  //         name: '2024-04-08',
  //         value: 25.6,
  //       },
  //       {
  //         name: '2024-04-09',
  //         value: 25.5,
  //       },
  //       {
  //         name: '2024-04-10',
  //         value: 13.6,
  //       },
  //       {
  //         name: '2024-04-11',
  //         value: 15.8,
  //       },
  //       {
  //         name: '2024-04-12',
  //         value: 19.1,
  //       },
  //       {
  //         name: '2024-04-13',
  //         value: 21.0,
  //       },
  //       {
  //         name: '2024-04-14',
  //         value: 17.4,
  //       },
  //       {
  //         name: '2024-04-15',
  //         value: 13.3,
  //       },
  //     ],
  //   },
  // ];
  multi?: { name: string | undefined; series: any } | never[];
  view: [number, number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'DAYS';
  yAxisLabel: string = '';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private historicalDataService: HistoricalDataService) {}
  ngOnInit() {
    if (this.latitude && this.longitude) {
      this.fetchData();
    } else {
      console.error(
        'Missing required input parameters: latitude, longitude, or selector'
      );
    }
  }
  ngOnChanges() {
    console.log('changes');

    if (this.latitude && this.longitude) {
      this.fetchData();
    } else {
      console.error(
        'Missing required input parameters: latitude, longitude, or selector'
      );
    }
  }
  private fetchData() {
    console.log('Inside the fetchData function:data ');
    this.historicalDataService
      .getHistoricalData(
        this.latitude,
        this.longitude,
        this.start_date,
        this.end_date,
        this.selector
      )
      .pipe(
        map((data) => {
          return this.processData(data);
        }),
        catchError((error) => {
          this.errorMessage =
            'An error occurred while fetching data: ' + error.message;
          return [];
        })
      )
      .subscribe((data: any) => {
        this.multi = data;
        this.yAxisLabel = this.selector;
      });
  }

  private processData(data: any): { name: string; series: any }[] | never[] {
    let combinedArray = [];
    if (this.selector === 'TEMPERATURE') {
      for (let i = 0; i < data.daily.time.length; i++) {
        combinedArray.push({
          name: data.daily.time[i],
          value: data.daily.temperature_2m_max[i],
        });
      }
      const processedData = {
        name: 'temperature',
        series: combinedArray,
      };
      console.log('Process data: ', processedData);
      return [processedData];
    } else if (this.selector === 'HUMIDITY') {
      for (let i = 0; i < data.hourly.time.length; i++) {
        combinedArray.push({
          name: data.hourly.time[i].split('T')[0],
          value: data.hourly.relative_humidity_2m[i],
        });
      }
      const processedData = {
        name: 'humidity',
        series: combinedArray,
      };
      console.log('Process data: ', processedData);
      return [processedData]; // Explicitly return processed data
    } else if (this.selector === 'WIND SPEED') {
      for (let i = 0; i < data.daily.time.length; i++) {
        combinedArray.push({
          name: data.daily.time[i],
          value: data.daily.wind_speed_10m_max[i],
        });
      }
      const processedData = {
        name: 'wind speed',
        series: combinedArray,
      };
      console.log('Process data: ', processedData);
      return [processedData];
    } else if (this.selector === 'UV INDEX') {
      for (let i = 0; i < data.daily.time.length; i++) {
        combinedArray.push({
          name: data.daily.time[i],
          value: data.daily.uv_index_max[i],
        });
      }
      const processedData = {
        name: 'uv index',
        series: combinedArray,
      };
      console.log('Process data: ', processedData);
      return [processedData];
    } else if (this.selector === 'AIR QUALITY') {
      for (let i = 0; i < data.hourly.time.length; i++) {
        combinedArray.push({
          name: data.hourly.time[i],
          value: data.hourly.pm10[i],
        });
      }
      const processedData = {
        name: 'air quality',
        series: combinedArray,
      };
      console.log('Process data: ', processedData);
      return [processedData];
    } else {
      // Handle other selector values (or lack thereof)
      console.error(`Unsupported selector: ${this.selector}`);
      return []; // Return an empty array for unsupported selectors
    }
  }
}

// onSelect(data: any): void {
//   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
// }

// onActivate(data: any): void {
//   console.log('Activate', JSON.parse(JSON.stringify(data)));
// }

// onDeactivate(data: any): void {
//   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
// }
// }
