import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsOverviewPageComponent } from './projects-overview-page.component';
import {DialogService} from "primeng/dynamicdialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConfirmDialog} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";

describe('ProjectsOverviewPageComponent', () => {
  let component: ProjectsOverviewPageComponent;
  let fixture: ComponentFixture<ProjectsOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProjectsOverviewPageComponent],
      providers: [DialogService, ConfirmationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
