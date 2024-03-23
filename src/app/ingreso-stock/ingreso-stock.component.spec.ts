import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoStockComponent } from './ingreso-stock.component';

describe('IngresoStockComponent', () => {
  let component: IngresoStockComponent;
  let fixture: ComponentFixture<IngresoStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresoStockComponent]
    });
    fixture = TestBed.createComponent(IngresoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});