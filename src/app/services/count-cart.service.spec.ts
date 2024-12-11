import { TestBed } from '@angular/core/testing';

import { countService } from './count-cart.service';

describe('CountCartService', () => {
  let service: countService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(countService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
