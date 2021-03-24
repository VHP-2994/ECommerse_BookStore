import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookreviewComponent } from './bookreview.component';

describe('BookreviewComponent', () => {
  let component: BookreviewComponent;
  let fixture: ComponentFixture<BookreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
