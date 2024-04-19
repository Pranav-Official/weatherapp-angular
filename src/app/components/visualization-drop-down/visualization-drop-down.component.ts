import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-visualization-drop-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualization-drop-down.component.html',
  styleUrl: './visualization-drop-down.component.css',
})
export class VisualizationDropDownComponent {
  showDropdown: boolean = false;
  dateContext: number = 0;
  currentDate = new Date();
  @Output() startDate = new EventEmitter<string>();
  @Output() endDate = new EventEmitter<string>();
  @Output() rangeSelector = new EventEmitter<string>();

  setPlaceholder(plaseholder: string) {
    const inputElement = document.getElementById(
      'rangePicker'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.placeholder = plaseholder;
      inputElement.value = '';
    }
  }

  onSelectorKeyUp(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    if (inputValue.trim() != '') {
      this.showDropdown = true;
    } else {
      this.showDropdown = false;
      return;
    }
    if (Number.isNaN(parseInt(inputValue))) {
      inputElement.value = '';
      this.showDropdown = false;
      return;
    }
    this.dateContext = parseInt(inputValue);
  }

  setDateRangeFromDays(days: number = this.dateContext) {
    var currentDate = new Date(); // Get the current date
    var targetDate = new Date(); // Create a new date object

    targetDate.setDate(currentDate.getDate() - days); // Subtract the specified number of days from the current date

    // Format the target date as yyyy-mm-dd
    var year = targetDate.getFullYear();
    var month = String(targetDate.getMonth() + 1).padStart(2, '0');
    var day = String(targetDate.getDate()).padStart(2, '0');

    var formattedDate = year + '-' + month + '-' + day;

    console.log(formattedDate);
    this.rangeSelector.emit('DAYS');
    this.startDate.emit(formattedDate);
    this.showDropdown = false;
    this.setPlaceholder(days.toString() + (days === 1 ? ' Day' : ' Days'));
  }
  setDateRangeFromWeeks(weeks: number = this.dateContext) {
    var currentDate = new Date(); // Get the current date
    var targetDate = new Date(); // Create a new date object

    targetDate.setDate(currentDate.getDate() - weeks * 7); // Subtract the specified number of weeks (converted to days) from the current date

    // Format the target date as yyyy-mm-dd
    var year = targetDate.getFullYear();
    var month = String(targetDate.getMonth() + 1).padStart(2, '0');
    var day = String(targetDate.getDate()).padStart(2, '0');

    var formattedDate = year + '-' + month + '-' + day;

    console.log(formattedDate);
    this.rangeSelector.emit('WEEKS');
    this.startDate.emit(formattedDate);
    this.showDropdown = false;
    this.setPlaceholder(weeks.toString() + (weeks === 1 ? ' Week' : ' Weeks'));
  }
  setDateRangeFromMonths(months: number = this.dateContext) {
    var currentDate = new Date(); // Get the current date
    var targetDate = new Date(currentDate); // Create a new date object

    // Subtract the specified number of months from the current date
    var targetMonth = currentDate.getMonth() - months;
    var targetYear = currentDate.getFullYear();

    // Adjust the year and month if the target month is negative
    while (targetMonth < 0) {
      targetMonth += 12;
      targetYear -= 1;
    }

    targetDate.setFullYear(targetYear, targetMonth, currentDate.getDate());

    // Format the target date as yyyy-mm-dd
    var year = targetDate.getFullYear();
    var month = String(targetDate.getMonth() + 1).padStart(2, '0');
    var day = String(targetDate.getDate()).padStart(2, '0');

    var formattedDate = year + '-' + month + '-' + day;

    console.log(formattedDate);
    this.rangeSelector.emit('MONTHS');
    this.startDate.emit(formattedDate);
    this.showDropdown = false;
    this.setPlaceholder(
      months.toString() + (months === 1 ? ' Month' : ' Months')
    );
  }
  setDateRangeFromYears(years: number = this.dateContext) {
    var currentDate = new Date(); // Get the current date
    var targetDate = new Date(currentDate); // Create a new date object

    // Subtract the specified number of years from the current date
    var targetYear = currentDate.getFullYear() - years;

    targetDate.setFullYear(
      targetYear,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    // Format the target date as yyyy-mm-dd
    var year = targetDate.getFullYear();
    var month = String(targetDate.getMonth() + 1).padStart(2, '0');
    var day = String(targetDate.getDate()).padStart(2, '0');

    var formattedDate = year + '-' + month + '-' + day;

    console.log(formattedDate);
    this.rangeSelector.emit('YEARS');
    this.startDate.emit(formattedDate);
    this.showDropdown = false;
    this.setPlaceholder(years.toString() + (years === 1 ? ' Year' : ' Years'));
  }

  ngOnInit() {
    this.endDate.emit(this.currentDate.toISOString().split('T')[0]);
  }
}
