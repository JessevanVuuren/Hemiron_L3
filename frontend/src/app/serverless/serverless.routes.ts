import { Routes } from "@angular/router";
import { CreateFunctionComponent } from "./components/pages/create-function/create-function.component";
import { MetricComponent } from "./components/pages/metric/metric.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";

export const serverlessRoutes: Routes = [
  { path: "serverless", component: DashboardComponent },
  { path: "serverless/create", component: CreateFunctionComponent },
  { path: "serverless/:id", component: MetricComponent },
];
