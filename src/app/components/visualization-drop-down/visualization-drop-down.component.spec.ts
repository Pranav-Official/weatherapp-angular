import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationDropDownComponent } from './visualization-drop-down.component';

describe('VisualizationDropDownComponent', () => {
  let component: VisualizationDropDownComponent;
  let fixture: ComponentFixture<VisualizationDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationDropDownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizationDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return value that is ented in the text field', () => {
    const textField =
      fixture.debugElement.nativeElement.querySelector('#rangePicker');
    textField.value = '12';

    // Dispatch a synthetic keyup event
    const keyupEvent = new KeyboardEvent('keyup', {
      bubbles: true, // Allow event bubbling
      cancelable: true, // Allow default behavior to be prevented (optional)
    });

    textField.dispatchEvent(keyupEvent);
    expect(component.dateContext).toBe(12);
  });

  it('should return 0 if the text field is empty or is whitespace', () => {
    const textField =
      fixture.debugElement.nativeElement.querySelector('#rangePicker');
    textField.value = '   ';

    // Dispatch a synthetic keyup event
    const keyupEvent = new KeyboardEvent('keyup', {
      bubbles: true, // Allow event bubbling
      cancelable: true, // Allow default behavior to be prevented (optional)
    });

    textField.dispatchEvent(keyupEvent);
    expect(component.dateContext).toBe(0);
  });

  it('should return 0 if the text field is not a number', () => {
    const textField =
      fixture.debugElement.nativeElement.querySelector('#rangePicker');
    textField.value = 'sad';

    // Dispatch a synthetic keyup event
    const keyupEvent = new KeyboardEvent('keyup', {
      bubbles: true, // Allow event bubbling
      cancelable: true, // Allow default behavior to be prevented (optional)
    });

    textField.dispatchEvent(keyupEvent);
    expect(component.dateContext).toBe(0);
  });

  it('should set placeholder if function is called', () => {
    const textField =
      fixture.debugElement.nativeElement.querySelector('#rangePicker');
    textField.value = 'sad';

    component.setPlaceholder('test');

    expect(textField.placeholder).toBe('test');
  });

  it('should set suggestion of days if function is called', () => {
    const textField =
      fixture.debugElement.nativeElement.querySelector('#rangePicker');
    component.dateContext = 3;
    const spy = jest.spyOn(component.rangeSelector, 'emit');
    component.setDateRangeFromDays();

    expect(spy).toHaveBeenCalledWith('DAYS');
    expect(textField.placeholder).toBe('3 Days');
  });
  it('should set suggestion of weeks if function is called', () => {
    const textField =
      fixture.debugElement.nativeElement.querySelector('#rangePicker');
    component.dateContext = 3;
    const spy = jest.spyOn(component.rangeSelector, 'emit');
    component.setDateRangeFromWeeks();

    expect(spy).toHaveBeenCalledWith('WEEKS');
    expect(textField.placeholder).toBe('3 Weeks');
  });

  it('should set suggestion of months if function is called', () => {
    const textField =
      fixture.debugElement.nativeElement.querySelector('#rangePicker');
    component.dateContext = 3;
    const spy = jest.spyOn(component.rangeSelector, 'emit');
    component.setDateRangeFromMonths();

    expect(spy).toHaveBeenCalledWith('MONTHS');
    expect(textField.placeholder).toBe('3 Months');
  });
  it('should set suggestion of years if function is called', () => {
    const textField =
      fixture.debugElement.nativeElement.querySelector('#rangePicker');
    component.dateContext = 3;
    const spy = jest.spyOn(component.rangeSelector, 'emit');
    component.setDateRangeFromYears();

    expect(spy).toHaveBeenCalledWith('YEARS');
    expect(textField.placeholder).toBe('3 Years');
  });

  it('should set suggestion of days if function is called with 1', () => {
    const textField =
      fixture.debugElement.nativeElement.querySelector('#rangePicker');
    component.dateContext = 1;
    const spy = jest.spyOn(component.rangeSelector, 'emit');
    component.setDateRangeFromDays();

    expect(spy).toHaveBeenCalledWith('DAYS');
    expect(textField.placeholder).toBe('1 Day');
  });
  it('should set suggestion of weeks if function is called with 1', () => {
    const textField =
      fixture.debugElement.nativeElement.querySelector('#rangePicker');
    component.dateContext = 1;
    const spy = jest.spyOn(component.rangeSelector, 'emit');
    component.setDateRangeFromWeeks();

    expect(spy).toHaveBeenCalledWith('WEEKS');
    expect(textField.placeholder).toBe('1 Week');
  });

  it('should set suggestion of months if function is called with 1', () => {
    const textField =
      fixture.debugElement.nativeElement.querySelector('#rangePicker');
    component.dateContext = 1;
    const spy = jest.spyOn(component.rangeSelector, 'emit');
    component.setDateRangeFromMonths();

    expect(spy).toHaveBeenCalledWith('MONTHS');
    expect(textField.placeholder).toBe('1 Month');
  });
  it('should set suggestion of years if function is called with 1', () => {
    const textField =
      fixture.debugElement.nativeElement.querySelector('#rangePicker');
    component.dateContext = 1;
    const spy = jest.spyOn(component.rangeSelector, 'emit');
    component.setDateRangeFromYears();

    expect(spy).toHaveBeenCalledWith('YEARS');
    expect(textField.placeholder).toBe('1 Year');
  });
});
