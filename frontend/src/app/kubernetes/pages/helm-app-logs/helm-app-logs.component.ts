import { Component, OnInit } from "@angular/core";
import { HelmAppService } from "../../services/helm-app.service";
import { Pod } from "../../models/pod.model";
import { ProjectService } from "src/app/project/services/project.service";
import { ActivatedRoute } from "@angular/router";
import { App } from "../../models/app.model";
import { from } from "rxjs";

@Component({
  selector: "app-helm-app-logs",
  templateUrl: "./helm-app-logs.component.html",
  styleUrl: "./helm-app-logs.component.scss",
})
export class HelmAppLogsComponent implements OnInit {

  constructor(private helmAppService: HelmAppService, private projectService: ProjectService, private aRoute: ActivatedRoute) {
    this.currentClusterId = this.aRoute.snapshot.paramMap.get('clusterId')
    this.currentAppId = this.aRoute.snapshot.paramMap.get('helmAppId')
  }

  public currentHelmApp: App | undefined;
  public currentAppId: string | null;
  public currentClusterId: string | null;
  public projectId!: string;
  public pods: Pod[] = []
  public selectedPod: string = ''
  public podLogs: string = ``

  ngOnInit(): void {
    if (this.projectService.currentProject?.id) {
      from(this.helmAppService.getHelmAppById(this.projectService.currentProject?.id, this.currentClusterId!, this.currentAppId!)).subscribe(helmApp => {
        this.currentHelmApp = helmApp;
      });
    }
  }

  public async loadLogs() {
    if (this.projectService.currentProject?.id) {
      from(this.helmAppService.getPodLogs(this.projectService.currentProject?.id, this.currentClusterId!, this.currentAppId!, this.selectedPod)).subscribe(
        podLogs => { this.podLogs = podLogs }
      );
    }
  }
}