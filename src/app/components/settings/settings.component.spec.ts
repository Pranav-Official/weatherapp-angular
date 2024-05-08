import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set target checked to true when save_search_history is "1"', () => {
    localStorage.setItem('save_search_history', '1');

    component.ngOnInit();

    const target = document.getElementById('save-search') as HTMLInputElement;
    expect(target.checked).toBe(true);
  });

  it('should set target checked to false when save_search_history is "0"', () => {
    localStorage.setItem('save_search_history', '0');

    component.ngOnInit();

    const target = document.getElementById('save-search') as HTMLInputElement;
    expect(target.checked).toBe(false);
  });

  it('should set unitSelector to uppercase preferred_units value', () => {
    localStorage.setItem('preferred_units', 'metric');

    component.ngOnInit();

    expect(component.unitSelector).toBe('METRIC');
  });
});
