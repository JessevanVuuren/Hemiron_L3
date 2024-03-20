import { Routes } from "@angular/router";
import { ProjectLayoutComponent } from "./pages/project-layout/project-layout.component";
import { billingRoutes } from "../billing/billing.routes";
import { postgresRoutes } from "../postgres/postgres.routes";
import { s3Routes } from "../s3/s3.routes";
import { vpsRoutes } from "../vps/vps.routes";
import { AuthGuard } from "../auth/guards/auth.guard";
import { ProjectPageNotFoundPageComponent } from "./pages/project-page-not-found-page/project-page-not-found-page.component";
import { projectAdminRoutes } from "../project-admin/project-admin.routes";
import { serviceRoutes } from "../service/service.routes";
import { ProjectGuard } from "./guards/project.guard";
import { ServiceCatalogPageComponent } from "../service/pages/service-catalog-page/service-catalog-page.component";
import { serverlessRoutes } from "../serverless/serverless.routes";
import { kubernetesRoutes } from '../kubernetes/kubernetes.routes';

export const projectRoutes: Routes = [
    {
        path: "project/:projectPath",
        canActivate: [ AuthGuard, ProjectGuard ],
        component: ProjectLayoutComponent,
        children: [
            {
                path: "",
                component: ServiceCatalogPageComponent,
            },
            ...billingRoutes,
            ...postgresRoutes,
            ...kubernetesRoutes,
            ...s3Routes,
            ...vpsRoutes,
            ...serverlessRoutes,
            ...serviceRoutes,
            ...projectAdminRoutes,
            {
                path: "**",
                component: ProjectPageNotFoundPageComponent,
            }
        ]
    }
]
