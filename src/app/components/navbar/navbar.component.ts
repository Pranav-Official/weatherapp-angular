import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchLocationService } from '../../services/search-location.service';
import { HttpClientModule } from '@angular/common/http';

interface LocationDetails {
  results: {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    elevation: string;
    feature_code: string;
    country_code: string;
    admin1_id: number;
    admin2_id: number;
    admin3_id: number;
    admin4_id: number;
    timezone: string;
    population: number;
    postcodes: number[];
  }[];
}
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [SearchLocationService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() showDropdown = false;
  searchResults: LocationDetails | null = null;

  constructor(private searchLocationService: SearchLocationService) {}

  onSearchKeyUp(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const partialName = inputElement.value;
    if (partialName.trim() === '' || partialName.length < 3) {
      this.showDropdown = false;
      return;
    }
    this.searchLocationService
      .searchLocation(partialName)
      .subscribe((searchResults) => {
        this.showDropdown = true;
        this.searchResults = searchResults;
      });
  }

  onSearchBlur() {
    this.showDropdown = false;
  }
}
