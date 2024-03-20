import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSideMenuComponent } from './project-side-menu.component';
import {ButtonModule} from "primeng/button";
import {RouterTestingModule} from "@angular/router/testing";
import {TooltipModule} from "primeng/tooltip";

describe('ProjectSideMenuComponent', () => {
  let component: ProjectSideMenuComponent;
  let fixture: ComponentFixture<ProjectSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectSideMenuComponent],
      imports: [
        RouterTestingModule,
        ButtonModule,
        TooltipModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
