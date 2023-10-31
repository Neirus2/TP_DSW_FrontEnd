import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdProveedorComponent } from './ud-proveedor.component';

describe('UdProveedorComponent', () => {
  let component: UdProveedorComponent;
  let fixture: ComponentFixture<UdProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UdProveedorComponent]
    });
    fixture = TestBed.createComponent(UdProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
