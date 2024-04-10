import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-info',
  standalone: true,
  imports: [],
  templateUrl: './single-info.component.html',
  styleUrl: './single-info.component.css',
})
export class SingleInfoComponent {
  @Input() imageUrl: string | undefined;
  @Input() text: string | undefined;
}
