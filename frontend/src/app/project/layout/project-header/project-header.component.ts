import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Roles} from "../../../core/enums/roles";
import {UserService} from "../../../user/services/user.service";
import {map, Observable} from "rxjs";
import {Page} from "../../models/page";
import {Project} from "../../models/project";
import {Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";

@Component({
    selector: 'app-project-header',
    templateUrl: './project-header.component.html',
    styleUrl: './project-header.component.scss'
})
export class ProjectHeaderComponent {
    @Input() expandedSideBar = false;
    @Output() expandedSideBarChange = new EventEmitter();

    public isKlant: boolean = false;
    public projects: Project[] = [];
    public activeProject: Project | undefined

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private projectService: ProjectService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        let roles: string[] = this.authService.getRoles();
        this.isKlant = roles.includes(Roles.Klant);

        this.getProjects().subscribe((projects: Page<Project>) => {
            this.projects = projects.content;
            const currentProject: Project | undefined = this.projectService.currentProject;
            const activeProjectIndex: number = this.projects.findIndex(project => project.id === currentProject?.id)
            this.activeProject = this.projects[activeProjectIndex];
        });
    }

    public toggleSideBar(): void {
        this.expandedSideBar = !this.expandedSideBar;
        this.expandedSideBarChange.emit(this.expandedSideBar);
    }

    private getProjects(): Observable<Page<Project>> {
        return this.userService.getMyProjects(0, 100).pipe(
            map((projects: Page<Project>) => {
                return projects;
            })
        );
    }

    switchToProject() {
        this.router.navigate(['project', this.activeProject?.path])
    }
}
