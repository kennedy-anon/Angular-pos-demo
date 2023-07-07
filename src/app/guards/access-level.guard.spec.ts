import { TestBed } from '@angular/core/testing';

import { AccessLevelGuard } from './access-level.guard';

describe('AccessLevelGuard', () => {
  let guard: AccessLevelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessLevelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
