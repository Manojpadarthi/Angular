import { TestBed } from '@angular/core/testing';

import { Luv2shopService } from './luv2shop.service';

describe('Luv2shopService', () => {
  let service: Luv2shopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Luv2shopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
