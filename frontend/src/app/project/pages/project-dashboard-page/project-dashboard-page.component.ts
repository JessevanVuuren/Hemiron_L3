import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "src/app/auth/services/auth.service";
import { Subscription } from "rxjs";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-project-dashboard-page",
  templateUrl: "./project-dashboard-page.component.html",
  styleUrl: "./project-dashboard-page.component.scss",
})
export class ProjectDashboardPageComponent implements OnInit, OnDestroy {
  public greeting = "Goedemorgen";
  public userFirstName: string | undefined;

  private userSubscription: Subscription | undefined;

  public tabItems = [
    { label: "Recente Resources" },
    { label: "Project leden" },
  ]

  public activeTab: MenuItem = this.tabItems[0];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.createGreating();
    this.getUserProfile();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  private createGreating(): void {
    const today = new Date();
    const currentHours = today.getHours();

    if (currentHours < 12) this.greeting = "Goedemorgen";
    else if (currentHours < 18) this.greeting = "Goedemiddag";
    else this.greeting = "Goedenavond";
  }

  private getUserProfile(): void {
    if (this.authService.profile) this.userFirstName = this.authService.profile.firstName;
    this.userSubscription = this.authService.profile$.subscribe(profile => {
      this.userFirstName = profile.firstName;
    });
  }
}
