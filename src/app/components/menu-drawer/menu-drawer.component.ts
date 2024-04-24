import { Component, Input } from '@angular/core';
import { SelectorComponent } from '../selector/selector.component';
import { LabelTimeComponent } from '../label-time/label-time.component';
import { LabelCardComponent } from '../label-card/label-card.component';

@Component({
  selector: 'app-menu-drawer',
  standalone: true,
  templateUrl: './menu-drawer.component.html',
  styleUrl: './menu-drawer.component.css',
  imports: [SelectorComponent, LabelTimeComponent, LabelCardComponent],
})
export class MenuDrawerComponent {
  @Input() menuSelector: string = 'SAVED';
  @Input() unitSelector: string = 'METRIC';
  setMenuSelector($event: string) {
    this.menuSelector = $event;
  }
  setUnitSelector($event: string) {
    this.unitSelector = $event;
  }
}
