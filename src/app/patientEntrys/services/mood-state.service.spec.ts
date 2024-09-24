import { TestBed } from '@angular/core/testing';

import { MoodStateService } from './mood-state.service';

describe('MoodStateService', () => {
  let service: MoodStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
