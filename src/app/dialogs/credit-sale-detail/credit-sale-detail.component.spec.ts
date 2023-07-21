import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSaleDetailComponent } from './credit-sale-detail.component';

describe('CreditSaleDetailComponent', () => {
  let component: CreditSaleDetailComponent;
  let fixture: ComponentFixture<CreditSaleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditSaleDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditSaleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
