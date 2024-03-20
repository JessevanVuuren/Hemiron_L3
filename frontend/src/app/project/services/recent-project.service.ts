import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecentProjectService {
  private readonly recentProjectListKey = "recent-projects";
  private readonly maxRecentProjects = 5;

  constructor() { }

  public addRecentProject(projectId: string): void {
    let recentProjects = this.getRecentProjects();
    recentProjects.unshift(projectId);
    recentProjects = recentProjects.slice(0, this.maxRecentProjects);
    recentProjects = [...new Set(recentProjects)];

    this.setRecentProjects(recentProjects);
  }

  public getRecentProjects(): string[] {
    const recentProjectsString = localStorage.getItem(this.recentProjectListKey);
    if (!recentProjectsString) return [];
    return JSON.parse(recentProjectsString);
  }

  public setRecentProjects(recentProjects: string[]): void {
    localStorage.setItem(this.recentProjectListKey, JSON.stringify(recentProjects));
  }
}
