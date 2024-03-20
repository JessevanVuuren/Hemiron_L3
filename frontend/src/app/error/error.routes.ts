import { Routes } from "@angular/router";
import { ProjectDoesNotExistPageComponent } from "./pages/project-does-not-exist-page/project-does-not-exist-page.component";
import { NoAccessToProjectPageComponent } from "./pages/no-access-to-project-page/no-access-to-project-page.component";
import { ErrorLayoutPageComponent } from "./pages/error-layout-page/error-layout-page.component";
import { NoProjectAdminPageComponent } from "./pages/no-project-admin-page/no-project-admin-page.component";

export const errorRoutes: Routes = [
    {
        path: "errors",
        component: ErrorLayoutPageComponent,
        children: [
            {
                path: "project-does-not-exist",
                component: ProjectDoesNotExistPageComponent,
            },
            {
                path: "no-access-to-project",
                component: NoAccessToProjectPageComponent,
            },
            {
                path: "no-project-admin",
                component: NoProjectAdminPageComponent,
            }
        ]
    }
]