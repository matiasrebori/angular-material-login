import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosDashboardComponent } from './precios-dashboard.component';

describe('PreciosDashboardComponent', () => {
  let component: PreciosDashboardComponent;
  let fixture: ComponentFixture<PreciosDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreciosDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
