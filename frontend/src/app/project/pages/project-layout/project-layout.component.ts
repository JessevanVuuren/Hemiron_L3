import { Component, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-layout',
  templateUrl: './project-layout.component.html',
  styleUrl: './project-layout.component.scss'
})
export class ProjectLayoutComponent implements OnDestroy {
  public expandedSideBar = false;

  constructor(private projectService: ProjectService) {}

  ngOnDestroy(): void {
    this.projectService.currentProject = undefined;
  }
}
