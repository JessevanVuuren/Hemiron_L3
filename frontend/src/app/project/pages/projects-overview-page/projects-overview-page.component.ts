import { Component } from "@angular/core";
import {ConfirmationService, MenuItem} from "primeng/api";
import { DatePipe } from "@angular/common";
import { AuthService } from "src/app/auth/services/auth.service";
import { Roles } from "src/app/core/enums/roles";

@Component({
  selector: "app-projects-overview-page",
  templateUrl: "./projects-overview-page.component.html",
  styleUrl: "./projects-overview-page.component.scss",
  providers: [DatePipe],
})
export class ProjectsOverviewPageComponent {
  public searchQuery = "";
  
  public tabItems: MenuItem[] = [
    { label: "Alle Projecten" },
    { label: "Recente Projecten" },
  ];
  
  public activeTab: MenuItem = this.tabItems[0];
  public isCustomer: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.checkForCustomerRole();
  }
  
  private checkForCustomerRole(): void {
    const roles = this.authService.getRoles();
    const isCustomer = roles.includes(Roles.Klant);
    this.isCustomer = isCustomer;
  }
}
