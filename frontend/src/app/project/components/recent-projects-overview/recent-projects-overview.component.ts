import { RecentProjectService } from './../../services/recent-project.service';
import { ProjectService } from 'src/app/project/services/project.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Project } from '../../models/project';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-recent-projects-overview',
  templateUrl: './recent-projects-overview.component.html',
  styleUrl: './recent-projects-overview.component.scss'
})
export class RecentProjectsOverviewComponent implements OnInit, OnChanges {
  @Input() searchQuery = "";
  @ViewChild('recentProjectsTable') recentProjectsTable: Table | undefined;

  public isInitiallyLoading = true;
  public hasApiTimeout = false;
  public projects: Project[] = [];

  constructor(
    private projectService: ProjectService, 
    private recentProjectService: RecentProjectService
  ) {}

  ngOnInit(): void {
    this.getRecentProjects();
  }

  ngOnChanges(): void {    
    if (this.recentProjectsTable) this.recentProjectsTable.filterGlobal(this.searchQuery, 'contains');
    if (this.recentProjectsTable) console.log(this.recentProjectsTable);
    
  }

  private getRecentProjects(): void {
    this.hasApiTimeout = false;
    const recentProjectIds = this.recentProjectService.getRecentProjects();
    this.projectService.getListOfProjects(recentProjectIds).subscribe({
      next: (response) => {
        this.projects = response;
        this.removeMissingProjectsFromRecent(this.projects);           
        this.isInitiallyLoading = false;
      },
      error: () => {
        this.hasApiTimeout = true;
        this.isInitiallyLoading = false;
      }
    });
  }

  private removeMissingProjectsFromRecent(projects: Project[]): void {
    const existingProjects: string[] = [];
    projects.forEach(project => {
      if(project.id) existingProjects.unshift(project.id);
    });

    this.recentProjectService.setRecentProjects(existingProjects);     
  }
  
  public reloadPage(): void {
    window.location.reload();
  }
}
