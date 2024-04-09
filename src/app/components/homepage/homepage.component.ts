import { Component } from '@angular/core';
import { SingleInfoComponentComponent } from '../single-info-component/single-info-component.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [SingleInfoComponentComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
