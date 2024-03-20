import { Component } from '@angular/core';
import { ClusterService } from '../../services/cluster.service';
import { ProjectService } from 'src/app/project/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cluster',
  templateUrl: './add-cluster.component.html',
  styleUrl: './add-cluster.component.scss'
})
export class AddClusterComponent {
  newClusterName: string = '';

  constructor(private clusterService: ClusterService, private projectService: ProjectService, private router: Router,) {
  }

  onSubmit() {
    if (this.projectService.currentProject?.id) {
      this.clusterService.createCluster(this.projectService.currentProject?.id, { name: this.newClusterName }).then(async () => {
        await this.router.navigate(["project", this.projectService.currentProject?.name , "kubernetes"])
      });
    }
  }

  updateValue(newValue: any) {
    this.newClusterName = newValue;
  }
}
