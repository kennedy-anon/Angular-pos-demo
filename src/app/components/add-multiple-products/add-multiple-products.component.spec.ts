import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleProductsComponent } from './add-multiple-products.component';

describe('AddMultipleProductsComponent', () => {
  let component: AddMultipleProductsComponent;
  let fixture: ComponentFixture<AddMultipleProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultipleProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMultipleProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
