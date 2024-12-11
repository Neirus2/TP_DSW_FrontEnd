import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SupplierService } from './supplier.service';
import { UdProveedorComponent } from '../ud-proveedor/ud-proveedor.component';
import { AltaProveedorComponent } from '../alta-proveedor/alta-proveedor.component';

describe('SupplierService', () => {
  let service: SupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UdProveedorComponent, AltaProveedorComponent]
    });
    service = TestBed.inject(SupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
