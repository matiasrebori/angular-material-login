import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosListadoComponent } from './precios-listado.component';

describe('PreciosListadoComponent', () => {
  let component: PreciosListadoComponent;
  let fixture: ComponentFixture<PreciosListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreciosListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
