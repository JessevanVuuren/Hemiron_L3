import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorLayoutPageComponent } from './error-layout-page.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('ErrorLayoutPageComponent', () => {
  let component: ErrorLayoutPageComponent;
  let fixture: ComponentFixture<ErrorLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ErrorLayoutPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
