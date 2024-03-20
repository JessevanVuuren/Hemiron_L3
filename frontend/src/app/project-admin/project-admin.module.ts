import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAdminOverviewPageComponent } from './pages/project-admin-overview-page/project-admin-overview-page.component';
import { RouterModule } from '@angular/router';
import { projectAdminRoutes } from './project-admin.routes';
import { ProjectAdminLayoutPageComponent } from './pages/project-admin-layout-page/project-admin-layout-page.component';
import { AdminPanelVpsComponent } from './pages/admin-panel-vps/admin-panel-vps.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {SharedModule} from "../shared/shared.module";
import {ButtonModule} from "primeng/button";
import {AdminVpsService} from "./services/admin-vps.service";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {MessageModule} from "primeng/message";



@NgModule({
  declarations: [
    ProjectAdminOverviewPageComponent,
    ProjectAdminLayoutPageComponent,
    AdminPanelVpsComponent,
  ],
  providers:[
    AdminVpsService,
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(projectAdminRoutes),
        PanelModule,
        SharedModule,
        ButtonModule,
        ReactiveFormsModule,
        OverlayPanelModule,
        MessageModule,
    ]
})
export class ProjectAdminModule { }
