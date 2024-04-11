import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-info-carousal',
  standalone: true,
  imports: [],
  templateUrl: './info-carousal.component.html',
  styleUrl: './info-carousal.component.css',
})
export class InfoCarousalComponent {
  availablePositions: [number, number][] = [];
  currentPositionIndex: number = 0;
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router
  ) {}
  setPositionNumbers(newViewportWidth: number): void {
    if (newViewportWidth >= 850) {
      this.availablePositions = [
        [1, 7],
        [8, 14],
        [15, 21],
        [15, 24],
      ];
    } else if (newViewportWidth >= 600) {
      this.availablePositions = [
        [1, 5],
        [6, 10],
        [11, 15],
        [16, 20],
        [21, 24],
      ];
    } else if (newViewportWidth >= 520) {
      this.availablePositions = [
        [1, 3],
        [4, 6],
        [7, 9],
        [10, 12],
        [13, 15],
        [16, 18],
        [19, 21],
        [22, 24],
      ];
    }
  }
  goToNextPosition(): void {
    if (this.currentPositionIndex < this.availablePositions.length - 1) {
      this.currentPositionIndex++;
      this.scrollItemToView(
        this.availablePositions[this.currentPositionIndex][1]
      );
    }
  }
  goToPreviousPosition(): void {
    if (this.currentPositionIndex > 0) {
      this.currentPositionIndex--;
      this.scrollItemToView(
        this.availablePositions[this.currentPositionIndex][0]
      );
    }
  }
  scrollItemToView(item: number) {
    const carousel =
      this.elementRef.nativeElement.ownerDocument.getElementById(
        'info-carousal'
      );
    if (carousel) {
      carousel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const item20 = carousel.querySelector('#item' + item);
      if (item20) {
        item20.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
  getCurrentViewportWidth(): number {
    return this.elementRef.nativeElement.ownerDocument.defaultView.innerWidth;
  }
  ngOnInit(): void {
    // Initial viewport width
    const viewportWidth = this.getCurrentViewportWidth();
    console.log('Viewport width:', viewportWidth);
    this.setPositionNumbers(viewportWidth);

    // Subscribe to window resize event
    this.renderer.listen('window', 'resize', () => {
      const newViewportWidth = this.getCurrentViewportWidth();
      console.log('New viewport width:', newViewportWidth);
      this.setPositionNumbers(newViewportWidth);
    });
  }
}
