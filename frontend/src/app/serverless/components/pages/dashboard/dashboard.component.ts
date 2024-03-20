import { Component, OnInit } from '@angular/core';
import { GetFunctionResponse } from 'src/app/serverless/data/function.data';
import { FunctionService } from 'src/app/serverless/services/function.service';
import {environment} from "../../../../../environments/environment";
import { ProjectService } from 'src/app/project/services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  functions: GetFunctionResponse[] = [];
  projectId: string | undefined;
  showErrorToast: boolean = false;
  toastMessage: string = "";

  constructor(private service: FunctionService, private projectService: ProjectService) {
    this.projectId = this.projectService.currentProject?.id;
  }

  ngOnInit(): void {
    this.handleRefresh();
  }

  handleRefresh(): void {
    const projectId = this.projectService.currentProject?.id;
    this.service.getAll(projectId ?? '').subscribe({
      next: (res) => this.functions = res,
      error: (err) => this.createToastMessage(err)
    });
  }

  getTriggerFunctionUrl(functionId: string): string {
    return environment.serverlessURL + '/v1/functions/serverless-endpoint/trigger/' + functionId
  }

  createToastMessage(message: string) {
    this.toastMessage = message;
    this.showErrorToast = true;

    setTimeout(() => {
      this.showErrorToast = false;
    }, 4000);
  }
}
