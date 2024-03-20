import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectService} from "../../project/services/project.service";

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {

  constructor(
    private projectService: ProjectService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const projectId = this.projectService.currentProject?.id ?? '';
    return next.handle(request.clone({
      headers: request.headers.set("Project-Id", projectId)
    }));
  }
}
