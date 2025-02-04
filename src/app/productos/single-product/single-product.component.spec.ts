import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleProductComponent } from './single-product.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavVarComponent } from 'src/app/nav-var/nav-var.component';
import { FormsModule } from '@angular/forms';

describe('SingleProductComponent', () => {
  let component: SingleProductComponent;
  let fixture: ComponentFixture<SingleProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleProductComponent, NavVarComponent],
      imports: [HttpClientModule, HttpClientTestingModule, FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'test-id' } } } }
      ]
    });
    fixture = TestBed.createComponent(SingleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
