import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTimeoutPageComponent } from './auth-timeout-page.component';
import {ButtonModule} from "primeng/button";

describe('AuthTimeoutPageComponent', () => {
  let component: AuthTimeoutPageComponent;
  let fixture: ComponentFixture<AuthTimeoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule],
      declarations: [AuthTimeoutPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthTimeoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
