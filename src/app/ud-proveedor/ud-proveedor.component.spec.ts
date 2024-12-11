import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UdProveedorComponent } from './ud-proveedor.component';
import { NavVarComponent } from '../nav-var/nav-var.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('UdProveedorComponent', () => {
  let component: UdProveedorComponent;
  let fixture: ComponentFixture<UdProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, FormsModule, CommonModule, RouterModule],
      declarations: [UdProveedorComponent, NavVarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'test-id' } } } }
      ]
    });
    fixture = TestBed.createComponent(UdProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
