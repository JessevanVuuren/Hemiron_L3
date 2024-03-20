import { Routes } from "@angular/router";
import { ClientLayoutComponent } from "./pages/client-layout/client-layout.component";
import { ProjectsOverviewPageComponent } from "../project/pages/projects-overview-page/projects-overview-page.component";
import { AuthGuard } from "../auth/guards/auth.guard";
import { errorRoutes } from "../error/error.routes";

export const clientRoutes: Routes = [
    {
        path: "",
        component: ClientLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "",
                redirectTo: "projects",
                pathMatch: "full",
            },
            {
                path: "projects",
                component: ProjectsOverviewPageComponent,
            },
            ...errorRoutes,
            {
                path: "**",
                redirectTo: "projects"
            }
        ]
    }
]