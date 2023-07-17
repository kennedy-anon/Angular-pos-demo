import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSalesComponent } from './credit-sales.component';

describe('CreditSalesComponent', () => {
  let component: CreditSalesComponent;
  let fixture: ComponentFixture<CreditSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
