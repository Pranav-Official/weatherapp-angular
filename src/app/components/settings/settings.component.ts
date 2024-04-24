import { Component, Input } from '@angular/core';
import { SelectorComponent } from '../selector/selector.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SelectorComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  @Input() unitSelector: string = 'METRIC';
  setUnitSelector($event: string) {
    this.unitSelector = $event;
  }
}
