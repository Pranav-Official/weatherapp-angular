import { SearchHistoryService } from './../../services/search-history.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
export class NavbarComponent implements OnInit {
  menuSelector: string = '';
  unitSelector: string = '';
  @Input() showDropdown = false;
  @Input() selectedLocation: string | undefined;
  @Input() latitude: string | undefined;
  @Input() longitude: string | undefined;
  searchResults: LocationDetails | null = null;
  resposiveMenuVisibility: boolean = false;

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
    this.menuSelector = 'SETTINGS';
    setTimeout(() => {
      this.menuSelector = menuSelector;
    }, 10);
  }

  constructor(
    private searchLocationService: SearchLocationService,
    private SearchHistoryService: SearchHistoryService,
    private router: Router,
    private elementRef: ElementRef
  ) {}
  ngOnInit(): void {
    window.addEventListener('resize', (event) => {
      if (
        this.elementRef.nativeElement.ownerDocument.defaultView.innerWidth >=
        890
      ) {
        this.resposiveMenuVisibility = false;
      } else {
        this.resposiveMenuVisibility = true;
      }
    });
  }

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
    if (localStorage.getItem('save_search_history') === '1') {
      this.SearchHistoryService.saveSearchHistory(
        latitude,
        longitude,
        name,
        country,
        timezone
      ).subscribe((data) => {
        if (data.status) {
          this.router.navigate(['/'], {
            queryParams: { latitude, longitude, name, country, timezone },
          });
        }
      });
    } else {
      this.router.navigate(['/'], {
        queryParams: { latitude, longitude, name, country, timezone },
      });
    }

    this.showDropdown = false;
    const inputElement = document.getElementById(
      'searchInput'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }
}
