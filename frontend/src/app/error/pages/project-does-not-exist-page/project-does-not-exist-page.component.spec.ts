import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDoesNotExistPageComponent } from './project-does-not-exist-page.component';
import {ButtonModule} from "primeng/button";
import {RouterTestingModule} from "@angular/router/testing";

describe('ProjectDoesNotExistPageComponent', () => {
  let component: ProjectDoesNotExistPageComponent;
  let fixture: ComponentFixture<ProjectDoesNotExistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule, RouterTestingModule],
      declarations: [ProjectDoesNotExistPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDoesNotExistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
