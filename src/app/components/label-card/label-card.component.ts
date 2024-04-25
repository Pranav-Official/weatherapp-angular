import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-card',
  standalone: true,
  imports: [],
  templateUrl: './label-card.component.html',
  styleUrl: './label-card.component.css',
})
export class LabelCardComponent {
  @Input() location: string = '';
  @Input() country: string = '';
}
