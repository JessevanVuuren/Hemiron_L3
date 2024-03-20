import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmDialog } from "primeng/confirmdialog";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from "src/app/user/services/user.service";
import { User } from "src/app/user/models/user";
import { ProjectService } from "../../services/project.service";
import {Project} from "../../models/project";

@Component({
  selector: "app-manage-users-dialog",
  templateUrl: "./manage-users-dialog.component.html",
  styleUrl: "./manage-users-dialog.component.scss",
})
export class ManageUsersDialogComponent {
  selectedProject: Project;

  users: User[] = [];
  assignedUserIds: String[] = [];

  @ViewChild("confirmationDialog") confirmationDialog!: ConfirmDialog;
  selectedUser: any;
  showConfirmation = false;

  searchQuery: string = "";

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authService: AuthService
  ) {
    this.selectedProject = this.config.data.project;
    this.getUsers();
    this.getAssignedUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.map((user) => ({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      }));
    });
  }

  getAssignedUsers() {
    if (!this.selectedProject || !this.selectedProject.id) return;
    this.projectService
      .getAssignedUsersFromProject(this.selectedProject.id)
      .subscribe((assignedUserIds) => {
        this.assignedUserIds = assignedUserIds;
      });
  }

  isUserAssigned(user: User) {
    return this.assignedUserIds.includes(user.id);
  }

  assignUser(user: User) {
    if (!this.selectedProject || !this.selectedProject.id) return;
    this.projectService
      .assignUserToProject(this.selectedProject.id, user.id)
      .subscribe((assignedUsers) => {
        this.assignedUserIds = assignedUsers;
      });
  }

  removeUser(user: User) {
    if (!this.selectedProject || !this.selectedProject.id) return;
    this.projectService
      .removeUserFromProject(this.selectedProject.id, user.id)
      .subscribe((assignedUsers) => {
        this.assignedUserIds = assignedUsers;
      });
  }

  onSearch() {
    this.userService.getUsersByTerm(this.searchQuery).subscribe((users) => {
      this.users = users.map((user) => ({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      }));
    });
  }

  mapToUsers() {}

  isAuthenticatedUser(user: User): boolean {
    const authenticatedId = this.authService.profile?.id;
    return authenticatedId == user.id ? true : false;
  }
}
