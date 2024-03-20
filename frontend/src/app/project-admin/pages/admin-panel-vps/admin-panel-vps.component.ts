import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminVpsService} from "../../services/admin-vps.service";
import {OverlayPanel} from "primeng/overlaypanel";
import {ProjectService} from "../../../project/services/project.service";
import {VpsCreate} from "../../../vps/models/vps-create.mode";

@Component({
    selector: 'app-admin-panel-vps',
    templateUrl: './admin-panel-vps.component.html',
    styleUrl: './admin-panel-vps.component.scss'
})
export class AdminPanelVpsComponent {
    @ViewChild("errorOverlay") errorOverlay!: OverlayPanel;
    public ERROR_TEXT :string = "Er is iets mis gegaan met het versturen van uw aanvraag. Probeer het later nog eens.";

    private FAILED_TO_GET_VPS: string ="VPS niet goed opgehaald herlaadt alstublieft";
    private SUCCESSFULLY_CREATED_VPS:string  = "De VPS is successful aangemaakt";

    private projectName :string | undefined = "";
    private projectPath: string | undefined = "";

    private SHOW_TOAST_MESSAGES_MILLISECONDS: number = 4000;
    public toastMessage: string = '';
    public showToast: boolean = false;

    private MINIMUM_LETTERS_IN_USERNAME: number = 4;
    private IPV4_PATTERN: string = '((?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|\D{1,3}))';


    public vpsForm = new FormGroup({
        // Ip is IPV4
        vpsIp: new FormControl("", [Validators.required, Validators.pattern(this.IPV4_PATTERN)]),
        vpsUserName: new FormControl("root", [Validators.required, Validators.min(this.MINIMUM_LETTERS_IN_USERNAME)]),
        vpsEmail: new FormControl("", [Validators.required, Validators.email]),
    });

    constructor(private vpsAdminService: AdminVpsService, private projectService: ProjectService) {
    }

    ngOnInit(): void {
        if( this.projectService.currentProject?.name == undefined){
            this.projectName = this.FAILED_TO_GET_VPS;
        }
        if(this.projectService.currentProject?.path == undefined){
            this.projectPath = this.FAILED_TO_GET_VPS;
        }
        this.projectName = this.projectService.currentProject?.name;

        this.projectPath = this.projectService.currentProject?.path;
    }

    async onSubmit(event: Event) {
        const data: VpsCreate = {
            email: this.vpsForm.value.vpsEmail ?? "",
            ip: this.vpsForm.value.vpsIp ?? "",
            project: this.projectName ?? "",
            userName: this.vpsForm.value.vpsUserName ?? "",
        };
        try {
            await this.vpsAdminService.postVpsCreated(data).then(()=> {
                this.createToast(this.SUCCESSFULLY_CREATED_VPS);
                this.vpsForm.reset();
            },(error) =>{
                this.ERROR_TEXT = error.response
            });

        } catch (e) {
            this.errorOverlay.toggle(event);
        }
    }

    private createToast(message: string) {
        this.toastMessage = message;
        this.showToast = true;

        setTimeout(() => {
            this.showToast = false;
        }, this.SHOW_TOAST_MESSAGES_MILLISECONDS);
    }

    getProjectName() {
        return this.projectName;
    }

    getProjectPath(): string| undefined {
        return this.projectPath;
    }
}
