import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddClusterComponent } from './pages/add-cluster/add-cluster.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from './components/table/table.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { AddHelmAppComponent } from './pages/add-helm-app/add-helm-app.component';

import { TableModule } from 'primeng/table';
import { InputComponent } from './components/input/input.component';
import { HelmAppDashboardComponent } from './pages/helm-app-dashboard/helm-app-dashboard.component';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HelmAppInfoComponent } from './pages/helm-app-info/helm-app-info.component';
import { TabViewModule } from 'primeng/tabview';
import { HelmAppLogsComponent } from './pages/helm-app-logs/helm-app-logs.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DropdownModule } from 'primeng/dropdown';
import { HelmAppService } from './services/helm-app.service';

@NgModule({
  declarations: [
    DashboardComponent,
    AddClusterComponent,
    AddHelmAppComponent,
    BreadcrumbsComponent,
    CodeEditorComponent,
    TableComponent,
    SearchBarComponent,
    InputComponent,
    HelmAppDashboardComponent,
    HelmAppInfoComponent,
    HelmAppLogsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    BreadcrumbModule,
    InputTextModule,
    TableModule,
    MonacoEditorModule,
    ToastModule,
    SplitButtonModule,
    ConfirmDialogModule,
    TabViewModule,
    ScrollPanelModule,
    DropdownModule
  ],
  providers: [
  ]
})
export class KubernetesModule { }