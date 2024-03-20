import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricLayoutComponent } from './metric-layout.component';

describe('MetricLayoutComponent', () => {
  let component: MetricLayoutComponent;
  let fixture: ComponentFixture<MetricLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
