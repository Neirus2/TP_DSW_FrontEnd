import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavVarComponent } from '../nav-var/nav-var.component';
import { PrivateTasksComponent } from './private-tasks.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('PrivateTasksComponent', () => {
  let component: PrivateTasksComponent;
  let fixture: ComponentFixture<PrivateTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, FormsModule],
      declarations: [ PrivateTasksComponent, NavVarComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'test-id' } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
