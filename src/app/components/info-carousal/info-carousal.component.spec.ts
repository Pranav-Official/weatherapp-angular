import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoCarousalComponent } from './info-carousal.component';

describe('InfoCarousalComponent', () => {
  let component: InfoCarousalComponent;
  let fixture: ComponentFixture<InfoCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCarousalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setpositionNumbers when viewport changes and width is greater than 850', () => {
    component.setPositionNumbers(1000);
    expect(component.availablePositions).toEqual([
      [0, 0],
      [1, 7],
      [8, 14],
      [15, 21],
      [15, 24],
    ]);
  });
  it('should call setpositionNumbers when viewport changes and width is greater than 600 and less than 850', () => {
    component.setPositionNumbers(700);
    expect(component.availablePositions).toEqual([
      [0, 0],
      [1, 5],
      [6, 10],
      [11, 15],
      [16, 20],
      [21, 24],
    ]);
  });
  it('should call setpositionNumbers when viewport changes and width is greater than 520 and less than 600', () => {
    component.setPositionNumbers(550);
    expect(component.availablePositions).toEqual([
      [0, 0],
      [1, 3],
      [4, 6],
      [7, 9],
      [10, 12],
      [13, 15],
      [16, 18],
      [19, 21],
      [22, 24],
    ]);
  });
  it('should return weather icon url for the weather code', () => {
    expect(component.getWeatherIconUrl(0, true)).toEqual(
      '../../../assets/icons/Sunny Day.png'
    );
    expect(component.getWeatherIconUrl(51, true)).toEqual(
      '../../../assets/icons/drizzle.png'
    );
    expect(component.getWeatherIconUrl(85, true)).toEqual(
      '../../../assets/icons/snowfall.png'
    );
  });
  it('should return the viewport width', () => {
    // Set the viewport width for testing
    (window as any).innerWidth = 800;

    // Call the method and expect it to return the viewport width
    expect(component.getCurrentViewportWidth()).toBe(800);
  });

  it('should go to the next position in the carousal', () => {
    component.availablePositions = [
      [0, 0],
      [1, 7],
      [8, 14],
      [15, 21],
      [15, 24],
    ];
    component.currentPositionIndex = 0;
    component.currentSelector = 'HOURLY';
    component.goToNextPosition();
    expect(component.currentPositionIndex).toEqual(1);
  });
  it('should go to the previous position in the carousal', () => {
    component.availablePositions = [
      [0, 0],
      [1, 7],
      [8, 14],
      [15, 21],
      [15, 24],
    ];
    component.currentPositionIndex = 2;
    component.currentSelector = 'HOURLY';
    component.goToPreviousPosition();
    expect(component.currentPositionIndex).toEqual(1);
  });
});
