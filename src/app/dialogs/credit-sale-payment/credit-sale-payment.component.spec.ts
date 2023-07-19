import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSalePaymentComponent } from './credit-sale-payment.component';

describe('CreditSalePaymentComponent', () => {
  let component: CreditSalePaymentComponent;
  let fixture: ComponentFixture<CreditSalePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditSalePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditSalePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
