import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAdminOverviewPageComponent } from './project-admin-overview-page.component';

describe('ProjectAdminOverviewPageComponent', () => {
  let component: ProjectAdminOverviewPageComponent;
  let fixture: ComponentFixture<ProjectAdminOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectAdminOverviewPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectAdminOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  });
});
