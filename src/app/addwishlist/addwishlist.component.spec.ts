import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwishlistComponent } from './addwishlist.component';

describe('AddwishlistComponent', () => {
  let component: AddwishlistComponent;
  let fixture: ComponentFixture<AddwishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddwishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
