import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStarsComponent } from './input-stars.component';

describe('InputStarsComponent', () => {
  let component: InputStarsComponent;
  let fixture: ComponentFixture<InputStarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputStarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
