import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from "./landing/landing.component";
import { DashboardComponent as ServerlessComponent } from '../serverless/components/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      { path: '', component: LandingComponent},
      { path: 'serverless', component: ServerlessComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
