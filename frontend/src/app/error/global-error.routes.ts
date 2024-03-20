import { Routes } from "@angular/router";
import { AuthTimeoutPageComponent } from "./pages/auth-timeout-page/auth-timeout-page.component";
import { ErrorLayoutPageComponent } from "./pages/error-layout-page/error-layout-page.component";
import { ProfileNotLoadedPageComponent } from "./pages/profile-not-loaded-page/profile-not-loaded-page.component";

export const globalErrorRoutes: Routes = [
    {
        path: "global-errors",
        component: ErrorLayoutPageComponent,
        children: [
            {
                path: "auth-timeout",
                component: AuthTimeoutPageComponent,
            },
            {
                path: "profile-not-loaded",
                component: ProfileNotLoadedPageComponent,
            },
        ]
    }
]