import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { VpsDashboardComponent } from "./pages/vps-dashboard/vps-dashboard.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { VpsListComponent } from "./pages/vps-list/vps-list.component";
import { SharedModule } from "../shared/shared.module";
import { VpsService } from "./services/vps.service";
import { ProjectInterceptor } from "../s3/interceptors/project.interceptor";

@NgModule({
	declarations: [VpsDashboardComponent, VpsListComponent],
	providers: [
		VpsService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ProjectInterceptor,
			multi: true,
		},
	],
	imports: [
		CommonModule,
		RouterModule,
		HttpClientModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		ButtonModule,
		InputTextModule,
		PanelModule,
		OverlayPanelModule,
		SharedModule,
	],
})
export class VpsModule {}
