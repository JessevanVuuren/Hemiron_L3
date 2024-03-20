import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { InvoicesComponent } from "./pages/invoices/invoices.component";
import { LandingComponent } from "./pages/landing/landing.component";
import {ProductsComponent} from "./pages/products/products.component";
import {AdminGuard} from "../auth/guards/admin.guard";

export const billingRoutes: Routes = [
  {
    path: "billing",
    component: LandingComponent,
    children: [
      {
        path: "invoices",
        component: InvoicesComponent,
      },
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "products",
        component: ProductsComponent,
        canActivate: [AdminGuard]
      },
    ],
  },
];
