import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-forecast-duration-selector',
  standalone: true,
  imports: [],
  templateUrl: './forecast-duration-selector.component.html',
  styleUrls: ['./forecast-duration-selector.component.css'],
})
export class ForecastDurationSelectorComponent {
  @Input() selectedDuration: string = 'HOURLY';
  @Input() durations: string[] = ['HOURLY', 'DAILY'];
  @Output() durationChange = new EventEmitter<string>();

  setDuration(duration: string) {
    this.selectedDuration = duration;
    this.durationChange.emit(duration);
    console.log(`Fetching weather forecast for ${duration} duration`);

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => tab.classList.remove('active'));

    const activeTab = document.querySelector(
      `button[class*='tab'][data-duration='${duration}']`
    );

    if (activeTab) {
      activeTab.classList.add('active');
    }
  }
}
