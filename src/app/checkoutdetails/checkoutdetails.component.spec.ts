import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutdetailsComponent } from './checkoutdetails.component';

describe('CheckoutdetailsComponent', () => {
  let component: CheckoutdetailsComponent;
  let fixture: ComponentFixture<CheckoutdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
