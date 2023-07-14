import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmClearComponent } from './confirm-clear.component';

describe('ConfirmClearComponent', () => {
  let component: ConfirmClearComponent;
  let fixture: ComponentFixture<ConfirmClearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmClearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
