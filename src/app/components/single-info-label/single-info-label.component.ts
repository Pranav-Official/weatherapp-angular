import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-info-label',
  standalone: true,
  imports: [],
  templateUrl: './single-info-label.component.html',
  styleUrl: './single-info-label.component.css',
})
export class SingleInfoLabelComponent {
  @Input() iconUrl: string | undefined;
  @Input() label: string | undefined;
  @Input() result: string | undefined;
}
