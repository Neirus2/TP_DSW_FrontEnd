import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosAdminComponent } from './pedidos-admin.component';

describe('PedidosAdminComponent', () => {
  let component: PedidosAdminComponent;
  let fixture: ComponentFixture<PedidosAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosAdminComponent]
    });
    fixture = TestBed.createComponent(PedidosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
