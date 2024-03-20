import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RecentProjectService } from './recent-project.service';
import { CreateProject } from '../models/create-project';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private projectsEndpoint = `${environment.projectsURL}projects`;

    private _currentProject: Project | undefined;
    public currentProjectPathInRoute: string | undefined;
    public currentProject$: Subject<Project | undefined> = new Subject<Project | undefined>();

    constructor(private http: HttpClient, private recentProjectService: RecentProjectService) {}

    public get currentProject(): Project | undefined {
        return this._currentProject;
    }

    public set currentProject(project: Project | undefined) {
        this._currentProject = project;
        this.currentProject$.next(this._currentProject);
        if (project && project.id) this.recentProjectService.addRecentProject(project.id)
    }

    public checkMyAccessToProject(projectId: string | undefined) {
        return this.http.get<boolean>(`${this.projectsEndpoint}/${projectId}/users/check`);
    }

  public createProject(project: CreateProject): Observable<Project> {
    return this.http.post<Project>(`${this.projectsEndpoint}`, project);    
  }

  public updateProject(projectId: string, project: CreateProject): Observable<Project> {
    return this.http.patch<Project>(`${this.projectsEndpoint}/${projectId}`, project);    
  }

    public deleteProject(projectId: string): Observable<String[]> {
        return this.http.delete<String[]>(`${this.projectsEndpoint}/delete/${projectId}`);
    }

    public getProjectByPath(path: string): Observable<Project> {
        return this.http.get<Project>(`${this.projectsEndpoint}/path/${path}`);
    }

    public getListOfProjects(projectIds: string[]): Observable<Project[]> {
        return this.http.post<Project[]>(`${this.projectsEndpoint}/list`, projectIds);
    }

    public assignUserToProject(projectId: String, userId: String): Observable<String[]> {
        // empty object 💀
        return this.http.patch<String[]>(`${this.projectsEndpoint}/${projectId}/users/${userId}`, {});
    }

    public removeUserFromProject(projectId: string, userId: string): Observable<String[]> {
        return this.http.delete<String[]>(`${this.projectsEndpoint}/${projectId}/users/${userId}`);
    }

    public getAssignedUsersFromProject(projectId: String): Observable<String[]> {
        return this.http.get<String[]>(`${this.projectsEndpoint}/${projectId}/users`);
    }
}
