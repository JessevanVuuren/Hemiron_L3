import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectLayoutComponent } from './project-layout.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ProjectHeaderComponent} from "../../layout/project-header/project-header.component";
import {ProjectSideMenuComponent} from "../../layout/project-side-menu/project-side-menu.component";

describe('ProjectLayoutComponent', () => {
  let component: ProjectLayoutComponent;
  let fixture: ComponentFixture<ProjectLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [
          ProjectLayoutComponent,
          ProjectHeaderComponent,
          ProjectSideMenuComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
