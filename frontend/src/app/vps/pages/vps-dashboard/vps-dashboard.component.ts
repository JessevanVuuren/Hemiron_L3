import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { VpsService } from "../../services/vps.service";
import { VpsRequest } from "../../models/vps-request.model";
import { OverlayPanel } from "primeng/overlaypanel";
import { ProjectService } from "../../../project/services/project.service";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
	selector: "app-dashboard",
	templateUrl: "./vps-dashboard.component.html",
	styleUrls: ["./vps-dashboard.component.scss"],
})
export class VpsDashboardComponent implements OnInit {
	@ViewChild("errorOverlay") errorOverlay!: OverlayPanel;

	private projectPath: string | undefined = "";

	public formHasBeenSend: boolean = false;
	private MINIMAL_LENGTH_BODY: number = 10;
	vpsForm = new FormGroup({
		text: new FormControl("", [Validators.required, Validators.minLength(this.MINIMAL_LENGTH_BODY)]),
	});

	constructor(private vpsService: VpsService, private projectService: ProjectService, private authService: AuthService) {}

	ngOnInit(): void {
		this.projectPath = this.projectService.currentProject?.path;
	}

	async onSubmit(event: Event) {
		const data: VpsRequest = {
			mailSubject: this.projectService.currentProject?.name ?? "",
			email: this.authService.profile?.email ?? "",
			mailBody: this.vpsForm.value.text ?? "",
		};
		try {
			await this.vpsService.postVpsRequest(data);
			this.formHasBeenSend = true;
		} catch (e) {
			this.errorOverlay.toggle(event);
		}
	}

	getProjectPath(): string | undefined {
		return this.projectPath;
	}
}
