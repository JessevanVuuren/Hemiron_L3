import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {AuthService} from "../../../auth/services/auth.service";
import {Roles} from "../../../core/enums/roles";

@Component({
  selector: 'app-project-side-menu',
  templateUrl: './project-side-menu.component.html',
  styleUrl: './project-side-menu.component.scss'
})
export class ProjectSideMenuComponent {
  @Input() expanded = false;
  @Output() expandedChange = new EventEmitter();

  constructor( private authService: AuthService) {
  }
  ngOnInit(){}

  public menuItems: MenuItem[] = [
    { url: "./", label: "Overzicht", icon: "fas fa-chart-pie" },
    { url: "./vps", label: "VPS", icon: "fas fa-server" },
    { url: "./postgres", label: "Database", icon: "fas fa-database" },
    { url: "./s3", label: "Blob Storage", icon: "fas fa-folder" },
    { url: "./kubernetes", label: "Kubernetes", icon: "fas fa-cubes" },
    { url: "./serverless", label: "Serverless", icon: "fas fa-subscript" },
  ];

  userIsAdmin() {
    let roles = this.authService.getRoles();
    return roles.includes(Roles.Klant);
  }
}
