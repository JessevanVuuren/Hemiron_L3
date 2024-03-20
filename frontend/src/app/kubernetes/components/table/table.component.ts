import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/project/services/project.service';
import { App } from '../../models/app.model';
import { Cluster } from '../../models/cluster.model';
import { ClusterService } from '../../services/cluster.service';
import { HelmAppService } from '../../services/helm-app.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  clusters: Cluster[] = [];
  helmApps: App[] = [];

  currentUrl!: string;

  constructor(private clusterService: ClusterService, private helmAppService: HelmAppService, private projectService: ProjectService, public router: Router, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.currentUrl = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    const currentClusterId = this.clusterService.getCurrentClusterId() || this.currentUrl;

    if (this.projectService.currentProject?.id && this.currentUrl === 'kubernetes') {
      this.getClusters(this.projectService.currentProject?.id);
    } else if (this.projectService.currentProject?.id) {
      this.getHelmApps(this.projectService.currentProject?.id, currentClusterId);
    }
  }


  public getClusters(projectId: string) {
    this.clusterService.getAllClusters(projectId).subscribe(clusters => {
      this.clusters = clusters;
    });
  }

  public getHelmApps(projectId: string, clusterId: string) {
    this.helmAppService.getAllHelmAppsByClusterId(projectId, clusterId).then(apps => {
      this.helmApps = apps;
    });
  }

  public formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss') || '';
  }

  public setCurrentClusterId(selectedCluster: Cluster, $event: MouseEvent) {
    this.clusterService.setCurrentClusterId(selectedCluster.id, $event);
  }


  public setCurrentAppId(selectedApp: any, $event: MouseEvent) {
    this.helmAppService.setCurrentAppId(selectedApp.id, $event);
  }

  public downloadKubeconfig(kubeConfig: string) {
    const blob = new Blob([kubeConfig], { type: 'application/yaml' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'kubeconfig.yaml';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }


}

