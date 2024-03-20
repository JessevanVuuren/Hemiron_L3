import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './pages/landing.component';
import { HttpClientModule } from "@angular/common/http";
import { PlansComponent } from "./pages/content/new-database/plans/plans.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LandingComponent,
    PlansComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ]
})
export class PostgresModule { }
