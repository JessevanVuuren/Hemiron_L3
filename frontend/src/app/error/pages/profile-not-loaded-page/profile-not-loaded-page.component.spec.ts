import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNotLoadedPageComponent } from './profile-not-loaded-page.component';
import {ButtonModule} from "primeng/button";

describe('ProfileNotLoadedPageComponent', () => {
  let component: ProfileNotLoadedPageComponent;
  let fixture: ComponentFixture<ProfileNotLoadedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule],
      declarations: [ProfileNotLoadedPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileNotLoadedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
