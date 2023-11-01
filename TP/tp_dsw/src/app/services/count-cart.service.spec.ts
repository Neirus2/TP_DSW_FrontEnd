import { TestBed } from '@angular/core/testing';

import { CountCartService } from './count-cart.service';

describe('CountCartService', () => {
  let service: CountCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
