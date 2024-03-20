import { Routes } from "@angular/router";
import { ProjectAdminLayoutPageComponent } from "./pages/project-admin-layout-page/project-admin-layout-page.component";
import { ProjectAdminOverviewPageComponent } from "./pages/project-admin-overview-page/project-admin-overview-page.component";
import {AdminPanelVpsComponent} from "./pages/admin-panel-vps/admin-panel-vps.component";
import {AdminGuard} from "../auth/guards/admin.guard";

export const projectAdminRoutes: Routes = [
    {
        path: "admin",
        component: ProjectAdminLayoutPageComponent,
        canActivate:[AdminGuard],
        children: [
            {
                path: "",
                component:ProjectAdminOverviewPageComponent,
            },
            {
                path: "vps",
                component:AdminPanelVpsComponent
            }
        ]
    }
]