import { AfterViewInit, Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-page-not-found-page',
  templateUrl: './project-page-not-found-page.component.html',
  styleUrl: './project-page-not-found-page.component.scss'
})
export class ProjectPageNotFoundPageComponent implements AfterViewInit {
  public projectPath: string | undefined;

  constructor(private projectService: ProjectService) {}

  ngAfterViewInit(): void {
    this.projectPath = this.projectService.currentProject?.path
  }
}
