import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { clientRoutes } from "./client.routes";
import { ClientLayoutComponent } from "./pages/client-layout/client-layout.component";
import { ClientHeaderComponent } from "./layout/client-header/client-header.component";
import { CommonLayoutModule } from "../common-layout/common-layout.module";
import { AuthModule } from "../auth/auth.module";

@NgModule({
	declarations: [ClientLayoutComponent, ClientHeaderComponent],
	imports: [CommonModule, RouterModule.forChild(clientRoutes), CommonLayoutModule, AuthModule],
})
export class ClientModule {}
