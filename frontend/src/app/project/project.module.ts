import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingModule } from '../billing/billing.module';
import { PostgresModule } from '../postgres/postgres.module';
import { S3Module } from '../s3/s3.module';
import { ServerlessModule } from '../serverless/serverless.module';
import { VpsModule } from '../vps/vps.module';
import { RouterModule } from '@angular/router';
import { projectRoutes } from './project.routes';
import { ProjectDashboardPageComponent } from './pages/project-dashboard-page/project-dashboard-page.component';
import { ProjectLayoutComponent } from './pages/project-layout/project-layout.component';
import { ProjectHeaderComponent } from './layout/project-header/project-header.component';
import { ProjectSideMenuComponent } from './layout/project-side-menu/project-side-menu.component';
import { ProjectsOverviewPageComponent } from './pages/projects-overview-page/projects-overview-page.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonLayoutModule } from '../common-layout/common-layout.module';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ProjectPageNotFoundPageComponent } from './pages/project-page-not-found-page/project-page-not-found-page.component';
import { ProjectAdminModule } from '../project-admin/project-admin.module';
import { ServiceModule } from '../service/service.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ManageUsersDialogComponent } from './dialogs/manage-users-dialog/manage-users-dialog.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CreateProjectDialogComponent } from './dialogs/create-project-dialog/create-project-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProjectDialogComponent } from './dialogs/update-project-dialog/update-project-dialog.component';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AllProjectsOverviewComponent } from './components/all-projects-overview/all-projects-overview.component';
import { RecentProjectsOverviewComponent } from './components/recent-projects-overview/recent-projects-overview.component';




@NgModule({
  declarations: [
    ProjectDashboardPageComponent,
    ProjectLayoutComponent,
    ProjectHeaderComponent,
    ProjectSideMenuComponent,
    ProjectsOverviewPageComponent,
    ProjectPageNotFoundPageComponent,
    ManageUsersDialogComponent,
    CreateProjectDialogComponent,
    UpdateProjectDialogComponent,
    AllProjectsOverviewComponent,
    RecentProjectsOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(projectRoutes),
    CommonLayoutModule,
    BillingModule,
    PostgresModule,
    S3Module,
    ServerlessModule,
    VpsModule,
    TabMenuModule,
    ButtonModule,
    FontAwesomeModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    TableModule,
    MenuModule,
    ServiceModule,
    ProjectAdminModule,
    CheckboxModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FormsModule,
    PaginatorModule,
    ProgressSpinnerModule,
  ]
})
export class ProjectModule { }
