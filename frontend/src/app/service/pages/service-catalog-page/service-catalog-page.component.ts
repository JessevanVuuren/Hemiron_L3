import {AfterViewInit, ChangeDetectorRef, Component, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCategory } from '../../models/service-category';
import { ServiceCatalog } from '../../constants/service-catalog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ProjectService } from 'src/app/project/services/project.service';

@Component({
  selector: 'app-service-catalog-page',
  templateUrl: './service-catalog-page.component.html',
  styleUrl: './service-catalog-page.component.scss'
})
export class ServiceCatalogPageComponent implements AfterViewInit {
  public serviceCatalog: ServiceCategory[] = ServiceCatalog;
  public showTimeout: any | undefined;
  public hideTimeout: any | undefined;

  private animationDurationInMs = 1000;
  private activeOverlay: OverlayPanel | undefined;

  public projectPath: string | undefined;

  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.projectPath = this.projectService.currentProject?.path;
    this.cdr.detectChanges();
  }

  public enterService(event: MouseEvent, overlay: OverlayPanel): void {
    if (this.activeOverlay) this.activeOverlay.hide();

    this.showTimeout = setTimeout(() => {
      overlay.show(event);
      this.activeOverlay = overlay;
    }, this.animationDurationInMs);
  }

  public leaveService(overlay: OverlayPanel): void {
    if (this.showTimeout) clearTimeout(this.showTimeout);

    this.hideTimeout = setTimeout(() => {
      overlay.hide();
      this.activeOverlay = undefined;
    }, this.animationDurationInMs);
  }

  public cancelHide(overlay: OverlayPanel): void {    
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
  }
}
