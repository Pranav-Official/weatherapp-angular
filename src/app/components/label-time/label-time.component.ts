import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-time',
  standalone: true,
  imports: [],
  templateUrl: './label-time.component.html',
  styleUrl: './label-time.component.css',
})
export class LabelTimeComponent {
  @Input() location: string = '';
  @Input() country: string = '';
  @Input() time: string = '';
}
