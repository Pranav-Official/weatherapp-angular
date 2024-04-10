import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-map-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-widget.component.html',
  styleUrl: './map-widget.component.css',
})
export class MapWidgetComponent {
  @Input() latitude: string | undefined;
  @Input() longitude: string | undefined;

  constructor(private domSanitizer: DomSanitizer) {}

  get sanitizedUrl(): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      `https://yandex.com/map-widget/v1/?feedback=map%2Fedit&feedback-context=map.controls&ll=${this.longitude}%2C${this.latitude}&z=10&embed=`
    );
  }
}
