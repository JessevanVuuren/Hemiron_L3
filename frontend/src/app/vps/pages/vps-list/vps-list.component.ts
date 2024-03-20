import {Component, ViewChild} from '@angular/core';
import {VpsService} from "../../services/vps.service";
import {Vps} from "../../models/vps.model";
import {OverlayPanel} from "primeng/overlaypanel";
import {ProjectService} from "../../../project/services/project.service";
import {AuthService} from "../../../auth/services/auth.service";
import {KeycloakProfile} from "keycloak-js";

@Component({
    selector: 'app-vps-list',
    templateUrl: './vps-list.component.html',
    styleUrl: './vps-list.component.scss'
})
export class VpsListComponent {
    @ViewChild("errorOverlay") errorOverlay!: OverlayPanel;

    public toastMessage: string = '';
    public showToast: boolean = false;

    private vpss: Vps[] = [];
    private projectPath: string | undefined;
    private projectName: string | undefined;
    private currentUser: KeycloakProfile | undefined;


    ngOnInit(): void {
        this.projectPath = this.projectService.currentProject?.path;
        this.currentUser = this.authService.profile;
        this.projectName = this.projectService.currentProject?.name;

        this.getAllVPS()
    }

    constructor(private vpsService: VpsService, private projectService: ProjectService, private authService: AuthService) {
    }


    private async getAllVPS(): Promise<void> {
        try {
            this.vpss = await this.vpsService.getAllVpsRequest(this.projectName);
        } catch (e) {
            this.errorOverlay.toggle(event);
        }
    }

    userIsProjectOwner(vps: Vps): boolean {
        return this.currentUser?.email == vps.email;
    }

    async deleteVPS(vps: Vps) {
        try {
            await this.vpsService.removeVPSRequest(vps).then(() => {
                    this.showDeletedVPS();
                    this.getAllVPS();
                }
            );
        } catch (e) {
            this.errorOverlay.toggle(event);
        }
    }

    private showDeletedVPS() {
        this.toastMessage = "De VPS is successful verwijderd";
        this.showToast = true;

        setTimeout(() => {
            this.showToast = false;
        }, 4000);
    }
    getVpss(){
        return this.vpss
    }

    getUserFirstName(): string | undefined {
        return this.currentUser?.firstName;
    }

    getProjectPath(): string | undefined {
        return this.projectPath;
    }

    getProjectName(): string | undefined {
        return this.projectName;
    }
}
