import { Routes } from '@angular/router';
import { ServiceCatalogPageComponent } from './pages/service-catalog-page/service-catalog-page.component';

export const serviceRoutes: Routes = [
    {
        path: "all-services",
        component: ServiceCatalogPageComponent,
    }
]