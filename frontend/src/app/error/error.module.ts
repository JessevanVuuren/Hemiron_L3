import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorLayoutPageComponent } from './pages/error-layout-page/error-layout-page.component';
import { AuthTimeoutPageComponent } from './pages/auth-timeout-page/auth-timeout-page.component';
import { ProfileNotLoadedPageComponent } from './pages/profile-not-loaded-page/profile-not-loaded-page.component';
import { ProjectDoesNotExistPageComponent } from './pages/project-does-not-exist-page/project-does-not-exist-page.component';
import { globalErrorRoutes } from './global-error.routes';
import { NoAccessToProjectPageComponent } from './pages/no-access-to-project-page/no-access-to-project-page.component';
import { NoProjectAdminPageComponent } from './pages/no-project-admin-page/no-project-admin-page.component';



@NgModule({
  declarations: [
    ErrorLayoutPageComponent,
    AuthTimeoutPageComponent,
    ProfileNotLoadedPageComponent,
    ProjectDoesNotExistPageComponent,
    NoAccessToProjectPageComponent,
    NoProjectAdminPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(globalErrorRoutes),
    ButtonModule,
  ]
})
export class ErrorModule { }
