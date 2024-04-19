import { Component, Input } from '@angular/core';
import { TemperatureWidgetComponent } from '../temperature-widget/temperature-widget.component';
import { MapWidgetComponent } from '../map-widget/map-widget.component';
import { SingleInfoComponent } from '../single-info/single-info.component';
import { SingleInfoLabelComponent } from '../single-info-label/single-info-label.component';
import { SunPositionIndicatorComponent } from '../sun-position-indicator/sun-position-indicator.component';
import { InfoCarousalComponent } from '../info-carousal/info-carousal.component';
import { VisualizationDropDownComponent } from '../visualization-drop-down/visualization-drop-down.component';
import { SelectorComponent } from '../selector/selector.component';
import { WeatherWidgetsComponent } from '../weather-widgets/weather-widgets.component';
import { ActivatedRoute } from '@angular/router';
import { VisualizationCartComponent } from '../visualization-cart/visualization-cart.component';
import { GetLocationFromIpService } from '../../services/get-location-from-ip.service';
import { CurrentTimeService } from '../../services/current-time.service';

type selectedLocation = {
  latitude: string;
  longitude: string;
  name: string;
  country: string;
  timezone: string;
};
@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [
    SingleInfoComponent,
    SingleInfoLabelComponent,
    TemperatureWidgetComponent,
    MapWidgetComponent,
    SunPositionIndicatorComponent,
    InfoCarousalComponent,
    VisualizationDropDownComponent,
    SelectorComponent,
    WeatherWidgetsComponent,
    VisualizationCartComponent,
  ],
  providers: [GetLocationFromIpService, CurrentTimeService],
})
export class HomepageComponent {
  startDate: string = this.getPastDate(3);
  endDate: string = this.getPastDate(0);
  baseLocationName = '';
  forecastSeletor = 'HOURLY';
  visualizationSelector = 'TEMPERATURE';
  queryParams: any;
  currentTimeFromAPI: string = '';
  currentTime: string = '';
  meridiem: string = '';
  setEndDate($event: string) {
    console.log('setEndDate' + $event);
    this.endDate = $event;
  }
  setStartDate($event: string) {
    console.log('setStartDate' + $event);
    this.startDate = $event;
  }
  @Input() selectedLocation: selectedLocation = {
    name: '',
    country: '',
    latitude: '',
    longitude: '',
    timezone: '',
  };

  constructor(
    private route: ActivatedRoute,
    private getLocationFromIpService: GetLocationFromIpService,
    private CurrentTimeService: CurrentTimeService
  ) {}

  getPastDate(dayOffset: number): string {
    const today = new Date();
    today.setDate(today.getDate() - dayOffset);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  onVisualizationSelectorUpdated(selectedValue: string) {
    this.visualizationSelector = selectedValue;
  }

  ngOnInit() {
    // Retrieve the query parameters from the route
    this.route.queryParams.subscribe((params) => {
      if (!params['latitude']) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.selectedLocation = {
              name: '',
              country: '',
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString(),
              timezone: '',
            };
          });
        } else {
          console.log('Geolocation is not supported by this browser.');
        }
      } else {
        this.selectedLocation.country = params['country'];
        this.selectedLocation.name = params['name'];
        this.selectedLocation.latitude = params['latitude'];
        this.selectedLocation.longitude = params['longitude'];
        this.selectedLocation.timezone = params['timezone'];
      }
      this.getLocationFromIpService.getLocation().subscribe((data) => {
        this.selectedLocation = {
          name: this.selectedLocation.name || data.city,
          country: this.selectedLocation.country || data.country_name,
          latitude: this.selectedLocation.latitude || data.latitude,
          longitude: this.selectedLocation.longitude || data.longitude,
          timezone: this.selectedLocation.timezone || data.timezone,
        };
        this.CurrentTimeService.getCurrentTime(
          this.selectedLocation.timezone
        ).subscribe((data) => {
          console.log('Current Data Details--->', data);
          this.currentTimeFromAPI = data.datetime;
          const timeSection = this.currentTimeFromAPI.slice(11, 19);
          const hours = parseInt(timeSection.slice(0, 2));
          const minutes = parseInt(timeSection.slice(3, 5));
          let minutesString: string = '';
          let meridiem = 'AM';
          let hours12 = hours;
          if (hours > 12) {
            hours12 = hours - 12;
            meridiem = 'PM';
          } else if (hours === 12) {
            meridiem = 'PM';
          } else if (hours === 0) {
            hours12 = 12;
          }
          if (minutes < 10) {
            minutesString = '0' + minutes.toString();
          } else {
            minutesString = minutes.toString();
          }
          this.currentTime = `${hours12}:${minutesString}`;
          this.meridiem = `${meridiem}`;
        });
        if (this.baseLocationName == '') {
          this.baseLocationName = this.selectedLocation.name;
        }
      });
    });
  }

  forcastSelectorChange(forecastSelectorValue: string) {
    this.forecastSeletor = forecastSelectorValue;
  }
}
