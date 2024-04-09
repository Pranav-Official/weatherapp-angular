import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-info-component',
  standalone: true,
  imports: [],
  templateUrl: './single-info-component.component.html',
  styleUrl: './single-info-component.component.css',
})
export class SingleInfoComponentComponent {
  @Input() imageUrl: string | undefined;
  @Input() text: string | undefined;
}
