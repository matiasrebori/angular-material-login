import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosModalComponent } from './precios-modal.component';

describe('PreciosModalComponent', () => {
  let component: PreciosModalComponent;
  let fixture: ComponentFixture<PreciosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreciosModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
