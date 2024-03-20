import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationIndicatorComponent } from './validation-indicator.component';

describe('ValidationIndicatorComponent', () => {
  let component: ValidationIndicatorComponent;
  let fixture: ComponentFixture<ValidationIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
