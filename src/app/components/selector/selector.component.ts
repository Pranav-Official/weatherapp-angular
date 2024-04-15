import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [],
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
})
export class SelectorComponent implements AfterViewInit {
  @Input() currentSelector: string | undefined;
  @Input() selectors: string[] | undefined;
  @Input() forecastSelector: string = '';
  @Input() visualisationSelector: string = '';
  @Input() initialSelector: string | undefined;
  @Output() selectorChange = new EventEmitter<string>();

  ngAfterViewInit() {
    if (this.selectors) {
      const firstSelector = this.selectors[0];

      if (firstSelector) {
        const activeTab = document.querySelector(
          `button[class*='tab'][data-selector='${firstSelector}']`
        );

        if (activeTab) {
          activeTab.classList.add('active');
        }
      }
    }
  }

  setSelector(element: string) {
    this.currentSelector = element;
    this.selectorChange.emit(element);
    console.log(`Fetching data for ${element}`);

    this.setActiveTab(element);
  }

  private setActiveTab(selector: string) {
    if (this.selectors) {
      for (const selector of this.selectors) {
        const tab = document.getElementById('selector-' + selector);
        if (tab) {
          tab.classList.remove('active');
        }
      }
    }
    const activeTab = document.getElementById('selector-' + selector);

    if (activeTab) {
      activeTab.classList.add('active');
    }
  }
}
