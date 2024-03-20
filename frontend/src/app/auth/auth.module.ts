import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthorizationHeaderInterceptor } from "./interceptors/authorization-header.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
	declarations: [],
	imports: [CommonModule],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthorizationHeaderInterceptor,
			multi: true,
		},
	],
})
export class AuthModule {}
