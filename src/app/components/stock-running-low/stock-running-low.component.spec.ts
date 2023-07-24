import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRunningLowComponent } from './stock-running-low.component';

describe('StockRunningLowComponent', () => {
  let component: StockRunningLowComponent;
  let fixture: ComponentFixture<StockRunningLowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockRunningLowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockRunningLowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
