import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSaleComponent } from './credit-sale.component';

describe('CreditSaleComponent', () => {
  let component: CreditSaleComponent;
  let fixture: ComponentFixture<CreditSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
