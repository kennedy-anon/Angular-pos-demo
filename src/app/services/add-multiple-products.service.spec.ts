import { TestBed } from '@angular/core/testing';

import { AddMultipleProductsService } from './add-multiple-products.service';

describe('AddMultipleProductsService', () => {
  let service: AddMultipleProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMultipleProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
