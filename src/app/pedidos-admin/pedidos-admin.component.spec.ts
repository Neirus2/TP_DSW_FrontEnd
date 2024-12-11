import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PedidosAdminComponent } from './pedidos-admin.component';
import { NavVarComponent } from '../nav-var/nav-var.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PedidosAdminComponent', () => {
  let component: PedidosAdminComponent;
  let fixture: ComponentFixture<PedidosAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [PedidosAdminComponent, NavVarComponent],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { 
            queryParams: of({ q: 'test-query' }) // Simulando los queryParams
          }
        }
      ]
    });
    fixture = TestBed.createComponent(PedidosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
