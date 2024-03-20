import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoAccessToProjectPageComponent } from './no-access-to-project-page.component';

describe('NoAccessToProjectPageComponent', () => {
  let component: NoAccessToProjectPageComponent;
  let fixture: ComponentFixture<NoAccessToProjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoAccessToProjectPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NoAccessToProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
