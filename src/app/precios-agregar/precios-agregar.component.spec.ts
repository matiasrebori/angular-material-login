import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosAgregarComponent } from './precios-agregar.component';

describe('PreciosAgregarComponent', () => {
  let component: PreciosAgregarComponent;
  let fixture: ComponentFixture<PreciosAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreciosAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciosAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
