import { Routes } from "@angular/router";
import { VpsDashboardComponent } from "./pages/vps-dashboard/vps-dashboard.component";
import { VpsListComponent } from "./pages/vps-list/vps-list.component";

export const vpsRoutes: Routes = [
	{
		path: "vps-request",
		component: VpsDashboardComponent,
	},
	{
		path: "vps",
		component: VpsListComponent,
	},
];
