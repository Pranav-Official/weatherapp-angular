import { Component, Input, OnInit } from '@angular/core';
import { SelectorComponent } from '../selector/selector.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, SelectorComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  setSaveSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      localStorage.setItem('save_search_history', '1');
    } else {
      localStorage.setItem('save_search_history', '0');
    }
  }
  @Input() unitSelector: string = 'METRIC';

  constructor() {}
  ngOnInit() {
    if (localStorage.getItem('save_search_history') === '1') {
      const target = document.getElementById('save-search') as HTMLInputElement;
      target.checked = true;
    } else {
      const target = document.getElementById('save-search') as HTMLInputElement;
      target.checked = false;
    }
    if (localStorage.getItem('preferred_units') != null) {
      this.unitSelector = (
        localStorage.getItem('preferred_units') as string
      ).toUpperCase();
    }
  }
  setUnitSelector(seletor: string) {
    this.unitSelector = seletor;
    if (localStorage.getItem('preferred_units') !== seletor.toLowerCase()) {
      localStorage.setItem('preferred_units', seletor.toLowerCase());
      window.location.reload();
    }
  }
}
