import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-sun-position-indicator',
  standalone: true,
  imports: [],
  templateUrl: './sun-position-indicator.component.html',
  styleUrl: './sun-position-indicator.component.css',
})
export class SunPositionIndicatorComponent {
  @Input()
  sunriseTime!: string;
  @Input()
  sunsetTime!: string;

  sunriseTimeText!: string;
  sunsetTimeText!: string;

  constructor() {}

  ngOnInit() {
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
  }
}
