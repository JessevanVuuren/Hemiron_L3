import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, UrlTree } from "@angular/router";
import { Observable, firstValueFrom } from "rxjs";
import { ProjectService } from "../services/project.service";
import { AuthService } from "src/app/auth/services/auth.service";
import { HttpStatusCode } from "@angular/common/http";
import { Project } from "../models/project";

@Injectable({
  providedIn: 'root',
})
export class ProjectGuard {
  constructor(private projectService: ProjectService, private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const projectPath = route.paramMap.get("projectPath");
    if (!projectPath) return new Promise<boolean>(resolve => resolve(false));

    return this.checkProjectAccessAsync(projectPath);
  }

  private async checkProjectAccessAsync(projectPath: string): Promise<boolean> {
    if (!this.authService.authenticated) await firstValueFrom(this.authService.authenticated$);
    
    const project: Project | void = await firstValueFrom(this.projectService.getProjectByPath(projectPath))
      .catch(error => {
        switch(error.status) {
          case HttpStatusCode.NotFound: this.handleProjectNotFound(); break;
          case HttpStatusCode.Unauthorized: this.handleNoAccessToProject(); break;
        }
      });
    if (!project) return this.handleProjectNotFound();
    
    const hasAccessToProject = await firstValueFrom(this.projectService.checkMyAccessToProject(project.id));
    if (!hasAccessToProject) return this.handleNoAccessToProject();

    this.projectService.currentProject = project;
    return new Promise<boolean>(resolve => resolve(true));
  }

  private handleProjectNotFound(): Promise<boolean> {
    this.router.navigate(['/errors/project-does-not-exist'], { skipLocationChange: true }); 
    return new Promise<boolean>(resolve => resolve(false));
  }

  private handleNoAccessToProject(): Promise<boolean>  {
    this.router.navigate(['/errors/no-access-to-project'], { skipLocationChange: true }); 
    return new Promise<boolean>(resolve => resolve(false));
  }
}