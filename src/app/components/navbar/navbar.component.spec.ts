import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the access token from the local storage when the logout function is called (logout button is clicked', () => {
    localStorage.setItem('accessToken', 'sampleToken');
    component.logout();
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  it('should return the loggedin status as true when checked for login status', () => {
    localStorage.setItem('accessToken', 'sampleToken');
    component.isLoggedIn();
    expect(localStorage.getItem('accessToken')).not.toBeNull();
  });

  it('should set menuSelector property after a short delay', fakeAsync(() => {
    const menuSelector = 'NEW_MENU';
    component.setMenuSelector(menuSelector);
    expect(component.menuSelector).toBe('SETTINGS');

    tick(11); // To Simulate passage of time by calling tick() with a delay slightly longer than the setTimeout
    expect(component.menuSelector).toBe(menuSelector);
  }));

  it('should set showDropdown to false on blur', () => {
    component.showDropdown = true;
    component.onSearchBlur();
    expect(component.showDropdown).toBe(false);
  });
});
