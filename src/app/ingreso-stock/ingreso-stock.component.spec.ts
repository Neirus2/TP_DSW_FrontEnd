import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IngresoStockComponent } from './ingreso-stock.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NavVarComponent } from '../nav-var/nav-var.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../services/product.service';
import { CategorySelectionService } from '../services/category-selection-service.service';
import { FormsModule } from '@angular/forms';

describe('IngresoStockComponent', () => {
  let component: IngresoStockComponent;
  let fixture: ComponentFixture<IngresoStockComponent>;

  beforeEach(() => {
    // Mock del servicio ProductService
    const productServiceMock = {
      getNoStockProducts: () => of([]),
      getProductsFiltered: (term: string) => of([]),
      filterByCategory: (category: string) => of([]),
      getProducts: () => of([]),
      updateProduct: (data: any, id: string) => of({ success: true })
    };

    // Mock del servicio CategorySelectionService
    const categorySelectionServiceMock = {
      categorySelected$: of('mock-category')
    };

    // Configuración del test
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [IngresoStockComponent, NavVarComponent, FooterComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ q: 'test-search' }) }
        },
        { provide: ProductService, useValue: productServiceMock },
        { provide: CategorySelectionService, useValue: categorySelectionServiceMock }
      ]
    });

    fixture = TestBed.createComponent(IngresoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
