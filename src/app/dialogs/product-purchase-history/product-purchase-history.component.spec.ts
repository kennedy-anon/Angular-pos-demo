import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPurchaseHistoryComponent } from './product-purchase-history.component';

describe('ProductPurchaseHistoryComponent', () => {
  let component: ProductPurchaseHistoryComponent;
  let fixture: ComponentFixture<ProductPurchaseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPurchaseHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPurchaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
