import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AltaProveedorComponent } from './alta-proveedor.component';
import { HttpClientModule } from '@angular/common/http';
import { NavVarComponent } from '../nav-var/nav-var.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('AltaProveedorComponent', () => {
  let component: AltaProveedorComponent;
  let fixture: ComponentFixture<AltaProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, FormsModule, CommonModule, RouterModule],
      declarations: [AltaProveedorComponent, NavVarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'test-id' } } } }
      ]
    });
    fixture = TestBed.createComponent(AltaProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
