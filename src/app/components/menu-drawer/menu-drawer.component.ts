import { Component, Input } from '@angular/core';
import { SettingsComponent } from '../settings/settings.component';
import { SavedLocationsComponent } from '../saved-locations/saved-locations.component';
import { SearchHistoryComponent } from '../search-history/search-history.component';
import { SelectorComponent } from '../selector/selector.component';

@Component({
  selector: 'app-menu-drawer',
  standalone: true,
  templateUrl: './menu-drawer.component.html',
  styleUrl: './menu-drawer.component.css',
  imports: [
    SelectorComponent,
    SettingsComponent,
    SavedLocationsComponent,
    SearchHistoryComponent,
  ],
})
export class MenuDrawerComponent {
  @Input() menuSelector: string = 'SAVED';

  setMenuSelector($event: string) {
    this.menuSelector = $event;
  }
}
