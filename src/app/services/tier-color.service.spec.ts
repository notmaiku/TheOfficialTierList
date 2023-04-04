import { TestBed } from '@angular/core/testing';

import { TierColorService } from './tier-color.service';

describe('TierColorService', () => {
  let service: TierColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TierColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
