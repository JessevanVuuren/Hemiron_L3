import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillingModule } from './billing/billing.module';
import { PostgresModule } from './postgres/postgres.module';
import { ServerlessModule } from './serverless/serverless.module';
import { SharedModule } from './shared/shared.module';
import { VpsModule } from './vps/vps.module';
import { S3Module } from "./s3/s3.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { HttpClientModule } from "@angular/common/http";
import { AppConfigService } from "./postgres/app-config.service";
import { CoreModule } from './core/core.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectModule } from './project/project.module';
import { ClientModule } from './client/client.module';
import { ErrorModule } from './error/error.module';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { KubernetesModule } from './kubernetes/kubernetes.module';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    HttpClientModule,
    ProjectModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BillingModule,
    ServerlessModule,
    VpsModule,
    PostgresModule,
    S3Module,
    KubernetesModule,
    ToastModule,
    ErrorModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    MonacoEditorModule.forRoot(),
    ClientModule, // must be imported last
  ],
  providers: [
    MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true
    },
    DialogService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
