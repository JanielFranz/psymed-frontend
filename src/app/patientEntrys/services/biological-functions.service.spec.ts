import { TestBed } from '@angular/core/testing';

import { BiologicalFunctionsService } from './biological-functions.service';

describe('BiologicalFunctionsService', () => {
  let service: BiologicalFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiologicalFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
