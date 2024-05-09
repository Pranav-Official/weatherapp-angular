import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MenuDrawerComponent } from './menu-drawer.component';
import { HttpClientModule } from '@angular/common/http';

describe('MenuDrawerComponent', () => {
  let component: MenuDrawerComponent;
  let fixture: ComponentFixture<MenuDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDrawerComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
