import { Component, Input, OnChanges } from '@angular/core';

const timeToMinutes = (hours: string) => {
  return parseInt(hours.split(':')[0]) * 60 + parseInt(hours.split(':')[1]);
};

const getProgress = (
  currentTime: string,
  sunriseTime: string,
  sunsetTime: string
) => {
  const currentMinutes = timeToMinutes(currentTime);
  const sunriseMinutes = timeToMinutes(sunriseTime);
  const sunsetMinutes = timeToMinutes(sunsetTime);
  if (currentMinutes < sunriseMinutes) {
    return 0;
  } else if (currentMinutes > sunsetMinutes) {
    return 100;
  } else {
    return (
      ((currentMinutes - sunriseMinutes) * 100) /
      (sunsetMinutes - sunriseMinutes)
    );
  }
};

@Component({
  selector: 'app-sun-position-indicator',
  standalone: true,
  imports: [],
  templateUrl: './sun-position-indicator.component.html',
  styleUrl: './sun-position-indicator.component.css',
})
export class SunPositionIndicatorComponent implements OnChanges {
  @Input()
  sunriseTime!: string;
  @Input()
  sunsetTime!: string;
  @Input() currentTime!: string;

  sunriseTimeText!: string;
  sunsetTimeText!: string;
  sunProgress!: number;

  constructor() {}

  ngOnChanges() {
    if (parseInt(this.sunsetTime?.split(':')[0]) > 12) {
      this.sunsetTimeText =
        (parseInt(this.sunsetTime?.split(':')[0]) - 12).toString() +
        ':' +
        this.sunsetTime?.split(':')[1];
      if (this.sunsetTimeText[0] != '0') {
        this.sunsetTimeText = '0' + this.sunsetTimeText;
      }
      this.sunsetTimeText += ' PM';
    } else {
      this.sunsetTimeText = this.sunsetTime;
    }
    if (parseInt(this.sunriseTime?.split(':')[0]) > 12) {
      this.sunriseTimeText =
        (parseInt(this.sunriseTime?.split(':')[0]) - 12).toString() +
        ':' +
        this.sunriseTime?.split(':')[1];
      if (this.sunriseTimeText[0] != '0') {
        this.sunriseTimeText = '0' + this.sunriseTimeText;
      }
      this.sunriseTimeText += ' PM';
    } else {
      this.sunriseTimeText = this.sunriseTime;
    }

    this.sunriseTimeText = this.sunriseTime + ' AM';
    this.sunProgress = Math.floor(
      getProgress(this.currentTime, this.sunriseTime, this.sunsetTime)
    );
  }
}
