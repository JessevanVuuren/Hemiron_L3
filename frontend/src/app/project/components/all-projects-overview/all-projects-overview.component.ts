import { Page } from "./../../models/page";
import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Project } from "../../models/project";
import { ConfirmationService, MenuItem } from "primeng/api";
import { Menu } from "primeng/menu";
import { Subscription } from "rxjs";
import { UserService } from "src/app/user/services/user.service";
import { DialogService } from "primeng/dynamicdialog";
import { CreateProjectDialogComponent } from "../../dialogs/create-project-dialog/create-project-dialog.component";
import { ManageUsersDialogComponent } from "../../dialogs/manage-users-dialog/manage-users-dialog.component";
import { UpdateProjectDialogComponent } from "../../dialogs/update-project-dialog/update-project-dialog.component";
import { Paginator } from "primeng/paginator";
import { ProjectService } from "../../services/project.service";


@Component({
  selector: "app-all-projects-overview",
  templateUrl: "./all-projects-overview.component.html",
  styleUrl: "./all-projects-overview.component.scss",
})
export class AllProjectsOverviewComponent implements OnInit, OnDestroy, OnChanges, DoCheck {
  @Input() public isCustomer = false;
  @Input() searchQuery = "";

  @ViewChild('paginator') paginator: Paginator | undefined;
  public rowsPreferenceKey = "all-projects-overview-rows-preference";
  private readonly searchTimeoutMs = 300;

  public isInitiallyLoading = true;
  public hasApiTimeout = false;
  public projects: Project[] = [];

  public page: number = 0;
  public rows: any = 10;
  public totalElements: number = 0;
  public totalPages: number = 0;

  public selectedProject: Project | undefined;
  public projectMenuSubscription: Subscription | undefined;
  public dialogCloseSubscription: Subscription | undefined;
  public searchTimeout: any; //Timeout object does not exist

  public projectMenu: MenuItem[] = [
    {
      label: "Beheer gebruikers",
      icon: "fas fa-users",
      command: () => {
        this.manageProjectUsers();
      },
    },
    {
      label: "Bewerk project",
      icon: "fas fa-pencil",
      command: () => {
        this.updateProject();
      },
    },
    {
      label: "Verwijder project",
      icon: "fas fa-trash",
      command: () => {
        this.deleteProject();
      },
    },
  ];

  constructor(
    private userService: UserService, 
    private dialogService: DialogService, 
    private confirmationService: ConfirmationService,
    private projectService: ProjectService,
) {}

  ngOnInit(): void {
    const rowsPreference = Number(localStorage.getItem(this.rowsPreferenceKey));
    if (rowsPreference) this.rows = rowsPreference;
    this.getProjects(this.page, this.rows);
  }

  ngOnDestroy(): void {
    if (this.projectMenuSubscription) this.projectMenuSubscription.unsubscribe();
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
  }

  ngOnChanges(): void {
    if (this.searchTimeoutMs) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.getProjects(this.page, this.rows), this.searchTimeoutMs);
  }

  ngDoCheck(): void {
    if (!this.paginator) return;
    this.rows = this.paginator.rows;
    this.setRowsPreference(this.paginator.rows);
  }

  public paginate(event: any): void {
    this.getProjects(event.page, event.rows);
  }

  private getProjects(page: number, rows: number): void {
    this.hasApiTimeout = false;

    this.userService.getMyProjects(page, rows, this.searchQuery).subscribe({
      next: (page: Page<Project>) => {
        this.projects = page.content;
        this.page = page.number;
        this.totalPages = page.totalPages;
        this.totalElements = page.totalElements;
        this.isInitiallyLoading = false;
      },
      error: () => {
        this.isInitiallyLoading = false;
        this.hasApiTimeout = true;        
      },
    });
  }

  public toggleProjectMenu(
    menu: Menu,
    $event: MouseEvent,
    project: Project
  ): void {
    if (this.projectMenuSubscription)
      this.projectMenuSubscription.unsubscribe();

    menu.toggle($event);
    this.selectedProject = project;
    this.projectMenuSubscription = menu.onHide.subscribe(
      () => (this.selectedProject = undefined)
    );
  }

  public setRowsPreference(rows: number): void {
    localStorage.setItem(this.rowsPreferenceKey, rows.toString());
  }

  public createProject(): void {
    const dialogRef = this.dialogService.open(CreateProjectDialogComponent, {
      header: "Aanmaken project",
      dismissableMask: true,
      width: "50vw",
      modal: true,
    });
    this.dialogCloseSubscription = dialogRef.onClose.subscribe(() =>
      this.getProjects(this.page, this.rows)
    );
  }

  public updateProject(): void {
    const dialogRef = this.dialogService.open(UpdateProjectDialogComponent, {
      header: "Bewerken project",
      dismissableMask: true,
      width: "50vw",
      modal: true,
      data: {
        project: this.selectedProject,
      },
    });
    this.dialogCloseSubscription = dialogRef.onClose.subscribe(() =>
      this.getProjects(this.page, this.rows)
    );
  }

  public manageProjectUsers(): void {
    const dialogRef = this.dialogService.open(ManageUsersDialogComponent, {
      header: "Beheren gebruikers",
      dismissableMask: true,
      width: "80vw",
      modal: true,
      data: {
        project: this.selectedProject,
      },
    });
    this.dialogCloseSubscription = dialogRef.onClose.subscribe(() =>
      this.getProjects(this.page, this.rows)
    );
  }

  public deleteProject(): void {
    if (this.selectedProject == undefined || !this.selectedProject.id) return;

    const projectId: string = this.selectedProject.id;
    this.confirmationService.confirm({
      header: "Project verwijderen",
      icon: "fa-solid fa-triangle-exclamation",
      message: `Je staat op het punt om het project: "${this.selectedProject.name}" te verwijderen, weet je dit zeker?`,
      acceptLabel: "Ja",
      rejectLabel: "Nee",
      dismissableMask: true,
      accept: () : void  => {
        this.projectService.deleteProject(projectId).subscribe(() => {
          this.getProjects(this.page, this.rows);
        })
      }
    });
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
