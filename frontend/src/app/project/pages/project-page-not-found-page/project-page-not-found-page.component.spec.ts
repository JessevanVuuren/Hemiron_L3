import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPageNotFoundPageComponent } from './project-page-not-found-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProjectPageNotFoundPageComponent', () => {
  let component: ProjectPageNotFoundPageComponent;
  let fixture: ComponentFixture<ProjectPageNotFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProjectPageNotFoundPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPageNotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
