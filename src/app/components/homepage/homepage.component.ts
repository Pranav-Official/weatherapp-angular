import { Component } from '@angular/core';
import { SingleInfoComponent } from '../single-info/single-info.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [SingleInfoComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
