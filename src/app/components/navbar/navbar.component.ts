import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() showDropdown = false;

  onSearchKeyUp(event: KeyboardEvent) {
    this.showDropdown = true;
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value === '') {
      this.showDropdown = false;
    }
  }

  onSearchBlur() {
    this.showDropdown = false;
  }
}
