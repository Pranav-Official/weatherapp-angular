import { Component, Input } from '@angular/core';
import { SelectorComponent } from '../selector/selector.component';

@Component({
  selector: 'app-menu-drawer',
  standalone: true,
  templateUrl: './menu-drawer.component.html',
  styleUrl: './menu-drawer.component.css',
  imports: [SelectorComponent],
})
export class MenuDrawerComponent {
  @Input() menuSelector: string = 'SAVED';

  setMenuSelector($event: string) {
    this.menuSelector = $event;
  }
}
