import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HistoricalDataService } from '../../services/historical-data.service';
import { catchError, map } from 'rxjs';
@Component({
  selector: 'app-visualization-cart',
  standalone: true,
  imports: [NgxChartsModule],
  providers: [HistoricalDataService],
  templateUrl: './visualization-chart.component.html',
  styleUrl: './visualization-chart.component.css',
})
export class VisualizationChartComponent {
  @Input() latitude?: string;
  @Input() longitude?: string;
  @Input() start_date?: string;
  @Input() end_date?: string;
  @Input() selector: string = '';
  @Input() timezone: string = '';

  errorMessage: string = '';
  multi?:
    | { name: string | undefined; series: any }[]
    | never[]
    | { name: string | undefined; series: any };
  view: [number, number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'DATE';
  yAxisLabel: string = '';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  errorText: any;

  constructor(private historicalDataService: HistoricalDataService) {}
  ngOnInit() {
    this.errorText = '';
    if (this.latitude && this.longitude) {
      this.fetchData();
    } else {
      console.error(
        'Missing required input parameters: latitude, longitude, or selector'
      );
    }
  }
  ngOnChanges() {
    this.errorText = '';
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
        this.selector,
        this.timezone
      )
      .pipe(
        map((data) => {
          return this.processData(data);
        }),
        catchError((error) => {
          this.errorMessage =
            'An error occurred while fetching data: ' + error.message;
          console.error('Error: ', error.message);
          if (
            error.message.split(' ')[error.message.split(' ').length - 1] ==
            '92'
          ) {
            this.errorText = 'Enter range between 1-92 days';
          }
          return [];
        })
      )
      .subscribe((data: any) => {
        this.multi = data;
      });
  }

  private processData(
    data: any
  ): { name: string; series: any }[] | never[] | any {
    let combinedArray = [];
    if (this.selector === 'TEMPERATURE') {
      this.yAxisLabel = `${
        localStorage.getItem('preferred_units') === 'imperial'
          ? 'TEMPERATURE(F)'
          : 'TEMPERATURE(°C)'
      }`;
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
      return [processedData];
    } else if (this.selector === 'HUMIDITY') {
      this.yAxisLabel = `${this.selector}(%)`;
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
      return [processedData];
    } else if (this.selector === 'WIND SPEED') {
      this.yAxisLabel = `${
        localStorage.getItem('preferred_units') === 'imperial'
          ? 'WIND SPEED(MPH)'
          : 'WIND SPEED(KPH)'
      }`;
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
      this.yAxisLabel = `${this.selector}`;
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
      this.yAxisLabel = `${this.selector} PM2.5(μg/m³)`;
      for (let i = 0; i < data.hourly.time.length; i++) {
        combinedArray.push({
          name: data.hourly.time[i].split('T')[0],
          value: data.hourly.pm2_5[i],
        });
      }
      const processedData = [
        {
          name: 'pm2_5(μg/m³)',
          series: combinedArray,
        },
      ];
      console.log('Process data: ', processedData);
      return processedData;
    } else {
      console.error(`Unsupported selector: ${this.selector}`);
      return [];
    }
  }
}
