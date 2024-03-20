import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DashboardTileComponent } from './components/dashboard-tile/dashboard-tile.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddBucketComponent } from './pages/add-bucket/add-bucket.component';
import { ValidationIndicatorComponent } from './components/validation-indicator/validation-indicator.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import {ProjectInterceptor} from "./interceptors/project.interceptor";
import { BucketDetailComponent } from './pages/bucket-detail/bucket-detail.component';
import { ObjectsBrowserComponent } from './components/objects-browser/objects-browser.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import {ConfirmationService} from "primeng/api";
import {FileUploadModule} from "primeng/fileupload";
import { CheckboxModule } from 'primeng/checkbox';
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [
    LandingComponent,
    DashboardComponent,
    DashboardTileComponent,
    ButtonComponent,
    AddBucketComponent,
    ValidationIndicatorComponent,
    DropdownComponent,
    BucketDetailComponent,
    ObjectsBrowserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmPopupModule,
    FileUploadModule,
    CheckboxModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule
  ],
  providers: [
      ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProjectInterceptor,
      multi: true
    }
  ]
})
export class S3Module { }
