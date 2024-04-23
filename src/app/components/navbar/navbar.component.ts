import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchLocationService } from '../../services/search-location.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { MenuDrawerComponent } from '../menu-drawer/menu-drawer.component';

interface LocationDetails {
  results: {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    country_code: string;
    timezone: string;
    country_id: number;
    country: string;
  }[];
}

type selectedLocation = {
  latitude: string;
  longitude: string;
  name: string;
  country: string;
  timezone: string;
};
@Component({
  selector: 'app-navbar',
  standalone: true,
  providers: [SearchLocationService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    LoginSignupComponent,
    MenuDrawerComponent,
  ],
})
export class NavbarComponent {
  menuSelector: string = '';
  @Input() showDropdown = false;
  @Input() selectedLocation: string | undefined;
  @Input() latitude: string | undefined;
  @Input() longitude: string | undefined;
  searchResults: LocationDetails | null = null;
  logout() {
    //fuction to logout by clearing local storage
    localStorage.clear();
    window.location.replace('/');
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('accessToken')) {
      return true;
    } else {
      return false;
    }
  }

  setMenuSelector(menuSelector: string) {
    this.menuSelector = menuSelector;
  }

  constructor(
    private searchLocationService: SearchLocationService,
    private router: Router
  ) {}

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

  onLocationClick(
    latitude: string,
    longitude: string,
    name: string,
    country: string,
    timezone: string
  ) {
    this.router.navigate(['/'], {
      queryParams: { latitude, longitude, name, country, timezone },
    });
    this.showDropdown = false;
    const inputElement = document.getElementById(
      'searchInput'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }
}
