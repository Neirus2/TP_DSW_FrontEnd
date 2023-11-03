import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownCompComponent } from './down-comp.component';

describe('DownCompComponent', () => {
  let component: DownCompComponent;
  let fixture: ComponentFixture<DownCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownCompComponent]
    });
    fixture = TestBed.createComponent(DownCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
