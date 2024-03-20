import { Component } from '@angular/core';
import { ProjectService } from 'src/app/project/services/project.service';
import { ClusterService } from '../../services/cluster.service';
import { Router } from '@angular/router';
import { Cluster } from '../../models/cluster.model';
import { from } from 'rxjs';
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-helm-app-dashboard',
  templateUrl: './helm-app-dashboard.component.html',
  styleUrl: './helm-app-dashboard.component.scss'
})
export class HelmAppDashboardComponent {

  HelmApps: any = [];
  currentCluster?: Cluster;
  currentClusterId!: string;


  constructor(private projectService: ProjectService, private clusterService: ClusterService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.currentClusterId = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }

  ngOnInit(): void {
    if (this.projectService.currentProject?.id) {
      from(this.clusterService.getClusterById(this.projectService.currentProject?.id, this.currentClusterId)).subscribe(cluster => {
        this.currentCluster = cluster;
      });
    }
  }

  deleteClusterDialog($event: MouseEvent) {

    this.confirmationService.confirm({
      message: 'Wil je deze cluster verwijderen?',
      header: 'Cluster verwijderen',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.deleteCluster();
        this.messageService.add({ severity: 'info', summary: 'Voltooid', detail: 'Cluster verwijderd' });
      },
      reject: () => {
      }
    });
  }

  public deleteCluster() {
    if (this.projectService.currentProject?.id) {
      this.clusterService.deleteCluster(this.projectService.currentProject?.id, this.currentClusterId).then(async () => {
        await this.router.navigate(["project", this.projectService.currentProject?.name, "kubernetes"])
      })
    }

  }
}