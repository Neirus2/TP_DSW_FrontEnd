import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievePassComponent } from './retrieve-pass.component';

describe('RetrievePassComponent', () => {
  let component: RetrievePassComponent;
  let fixture: ComponentFixture<RetrievePassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
