import { Component } from '@angular/core';
import { filter, from } from 'rxjs';
import { HelmAppService } from '../../services/helm-app.service';
import { ProjectService } from 'src/app/project/services/project.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { App } from '../../models/app.model';
import { ConfirmationService, MessageService } from "primeng/api";
import { VerifyChartDto } from '../../models/verify-chart-dto.model';
import { AppDto } from '../../models/app-dto.model';


@Component({
  selector: 'app-helm-app-info',
  templateUrl: './helm-app-info.component.html',
  styleUrl: './helm-app-info.component.scss'
})
export class HelmAppInfoComponent {


  protected currentHelmApp!: App;
  protected currentAppId: string | null;
  protected currentClusterId: string | null;
  protected chartIsInvalid!: boolean;


  protected statusColor: string = "text-primary";

  constructor(private helmAppService: HelmAppService, private projectService: ProjectService, private aRoute: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.currentClusterId = this.aRoute.snapshot.paramMap.get('clusterId')
    this.currentAppId = this.aRoute.snapshot.paramMap.get('helmAppId')
  }

  ngOnInit(): void {
    if (this.projectService.currentProject?.id) {
      from(this.helmAppService.getHelmAppById(this.projectService.currentProject?.id, this.currentClusterId!, this.currentAppId!)).subscribe(helmApp => {
        this.currentHelmApp = helmApp;
        this.helmAppService.setYamlContent(this.currentHelmApp.values);
        this.setStatusColor();
      });
    }

    this.helmAppService.chartIsInvalid$.subscribe((value) => {
      this.chartIsInvalid = value;
    });
    
    this.resetEditorOnNavigate();

  }

  public getHelmAppService(): HelmAppService {
    return this.helmAppService;
  }

  public async verifyChart() {
    (await this.helmAppService.verifyChart(this.getUpdatedChartValues())).subscribe({
      next: () => {
        this.getHelmAppService().updateChartValidity(false);
        this.messageService.add({
          key: "verify",
          severity: "success",
          summary: "Chart geverifieerd!",
          detail: "U kunt nu uw app toevoegen aan uw cluster.",
        });
      },
      error: () => {
        this.getHelmAppService().updateChartValidity(true);
        this.messageService.add({
          key: "verify",
          severity: "error",
          summary: "Chart kon niet geverifieerd worden",
          detail:
            "Zorg ervoor dat de chart echt bestaat en dat uw .yaml bestand correct is.",
        });
      },
    });
  }

  editAppDialog($event: MouseEvent) {

    this.confirmationService.confirm({
      message: 'Wil je deze App aanpassen?',
      header: 'App aanpassen',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.editApp();
        this.messageService.add({ severity: 'info', summary: 'Voltooid', detail: 'App aangepast' });
      },
      reject: () => {
      }
    });
  }

  deleteAppDialog($event: MouseEvent) {

    this.confirmationService.confirm({
      message: 'Wil je deze App verwijderen?',
      header: 'App verwijderen',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.deleteApp();
        this.messageService.add({ severity: 'info', summary: 'Voltooid', detail: 'App verwijderd' });
      },
      reject: () => {
      }
    });
  }

  public deleteApp() {
    if (this.projectService.currentProject?.id) {
      this.helmAppService.deleteHelmApp(this.projectService.currentProject?.id, this.currentClusterId!, this.currentAppId!).then(async () => {
        await this.router.navigate(["project", this.projectService.currentProject?.name, "kubernetes", this.currentClusterId])
      })
    }
  }


  public editApp() {
    if (this.projectService.currentProject?.id) {
      this.helmAppService.updateHelmApp(this.projectService.currentProject?.id, this.currentClusterId!, this.currentAppId!, this.getUpdatedHelmApp()).then(async () => {
        await this.router.navigate(["project", this.projectService.currentProject?.name, "kubernetes", this.currentClusterId])
      })
    }
  }

  public getUpdatedChartValues(): VerifyChartDto {
    const verifyChartDto: VerifyChartDto = {
      repositoryUrl: this.currentHelmApp.repositoryUrl,
      chartName: this.currentHelmApp.chartName,
      chartVersion: this.currentHelmApp.chartVersion,
      values: this.getHelmAppService().getYamlContent(),
    };
    return verifyChartDto;
  }

  public getUpdatedHelmApp() {
    const updatedHelmApp: AppDto = {
      name: this.currentHelmApp.name,
      description: this.currentHelmApp.description,
      repositoryUrl: this.currentHelmApp.repositoryUrl,
      chartName: this.currentHelmApp.chartName,
      chartVersion: this.currentHelmApp.chartVersion,
      values: this.getHelmAppService().getYamlContent(),
    };
    return updatedHelmApp;
  }

  private resetEditorOnNavigate(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.helmAppService.resetEditor();
      });
  }



  public setStatusColor() {
    switch (this.currentHelmApp.status) {
      case 'INSTALLING':
        this.statusColor = 'text-gray-400';
        break;
      case 'UPDATING':
        this.statusColor = 'text-blue-400';
        break;
      case 'HEALTHY':
        this.statusColor = 'text-green-400';
        break;
      case 'UNHEALTHY':
        this.statusColor = 'text-orange-400';
        break;
      case 'REMOVING':
        this.statusColor = 'text-red-400';
        break;
      default:
        this.statusColor = 'text-primary';
        break;
    }
  }



}
