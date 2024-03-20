import { Routes } from "@angular/router";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddClusterComponent } from './pages/add-cluster/add-cluster.component';
import { AddHelmAppComponent } from "./pages/add-helm-app/add-helm-app.component";
import { HelmAppDashboardComponent } from './pages/helm-app-dashboard/helm-app-dashboard.component';
import { HelmAppInfoComponent } from './pages/helm-app-info/helm-app-info.component';


export const kubernetesRoutes: Routes = [
  { path: "kubernetes", component: DashboardComponent},
  { path: "kubernetes/add-cluster", component: AddClusterComponent},
  { path: "kubernetes/:clusterId", component: HelmAppDashboardComponent},
  { path: "kubernetes/:clusterId/add-helmapp", component: AddHelmAppComponent},
  { path: "kubernetes/:clusterId/:helmAppId", component: HelmAppInfoComponent}

];
