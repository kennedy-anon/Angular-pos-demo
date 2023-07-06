import { TestBed } from '@angular/core/testing';

import { SnackBarCustomService } from './snack-bar-custom.service';

describe('SnackBarCustomService', () => {
  let service: SnackBarCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackBarCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
