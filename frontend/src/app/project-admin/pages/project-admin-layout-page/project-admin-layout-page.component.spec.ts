import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAdminLayoutPageComponent } from './project-admin-layout-page.component';

describe('ProjectAdminLayoutPageComponent', () => {
  let component: ProjectAdminLayoutPageComponent;
  let fixture: ComponentFixture<ProjectAdminLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectAdminLayoutPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectAdminLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
