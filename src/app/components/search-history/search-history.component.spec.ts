import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SearchHistoryComponent } from './search-history.component';
import { ActivatedRoute } from '@angular/router';
describe('SearchHistoryComponent', () => {
  let component: SearchHistoryComponent;
  let fixture: ComponentFixture<SearchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchHistoryComponent, HttpClientModule],
      providers: [
        // Provide a mock ActivatedRoute
        {
          provide: ActivatedRoute,
          useValue: {
            // Define any properties or methods that the component uses from ActivatedRoute
            snapshot: {
              paramMap: {
                get: () => 'testParamValue', // Mocking paramMap.get() method
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
