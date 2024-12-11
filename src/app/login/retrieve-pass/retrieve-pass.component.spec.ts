import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RetrievePassComponent } from './retrieve-pass.component';
import { FormsModule } from '@angular/forms';

describe('RetrievePassComponent', () => {
  let component: RetrievePassComponent;
  let fixture: ComponentFixture<RetrievePassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, FormsModule],
      declarations: [RetrievePassComponent]
    });
    fixture = TestBed.createComponent(RetrievePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
