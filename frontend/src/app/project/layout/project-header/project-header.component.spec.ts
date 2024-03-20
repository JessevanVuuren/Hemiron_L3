import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectHeaderComponent } from './project-header.component';
import {AuthService} from "../../../auth/services/auth.service";
import {ProjectService} from "../../services/project.service";

describe('ProjectHeaderComponent', () => {
  let component: ProjectHeaderComponent;
  let fixture: ComponentFixture<ProjectHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectHeaderComponent, AuthService, ProjectService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
